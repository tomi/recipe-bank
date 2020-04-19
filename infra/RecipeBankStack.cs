using Pulumi;
using Pulumi.Azure.AppService;
using Pulumi.Azure.AppService.Inputs;
using Pulumi.Azure.Authorization;
using Pulumi.Azure.Core;
using Pulumi.Azure.KeyVault;
using Pulumi.Azure.KeyVault.Inputs;
using Pulumi.Azure.Storage;
using Pulumi.Azure.Storage.Inputs;

class RecipeBankStack : Stack
{
  public RecipeBankStack()
  {
    var config = new Pulumi.Config();
    var resourceGroup = new ResourceGroup("RecipeBank");

    // Create an Azure Storage Account
    var storageAccount = new Account("storage", new AccountArgs
    {
      ResourceGroupName = resourceGroup.Name,
      AccountReplicationType = "LRS",
      AccountTier = "Standard",
      EnableHttpsTrafficOnly = true
    });

    var clientConfig = Output.Create(Pulumi.Azure.Core.Invokes.GetClientConfig());
    var tenantId = clientConfig.Apply(c => c.TenantId);
    var currentPrincipal = clientConfig.Apply(c => c.ObjectId);

    // Key Vault to store secrets
    var vault = new KeyVault("vault", new KeyVaultArgs
    {
      ResourceGroupName = resourceGroup.Name,
      SkuName = "standard",
      TenantId = tenantId,
      AccessPolicies =
      {
        new KeyVaultAccessPoliciesArgs
        {
            TenantId = tenantId,
            // The current principal has to be granted permissions to Key Vault so that it can actually add and then remove
            // secrets to/from the Key Vault. Otherwise, 'pulumi up' and 'pulumi destroy' operations will fail.
            ObjectId = currentPrincipal,
            SecretPermissions = {"delete", "get", "list", "set"},
        }
      },
    });

    // A plan to host the App Service
    var appServicePlan = new Plan("api", new PlanArgs
    {
      ResourceGroupName = resourceGroup.Name,
      Kind = "Linux",
      Reserved = true,
      Sku = new PlanSkuArgs
      {
        Tier = "Free",
        Size = "F1",
      },
    });

    // The application hosted in App Service
    var app = new AppService("api", new AppServiceArgs
    {
      ResourceGroupName = resourceGroup.Name,
      AppServicePlanId = appServicePlan.Id,
      // A system-assigned managed service identity to be used for authentication and authorization to the Storage
      Identity = new AppServiceIdentityArgs { Type = "SystemAssigned" },
      AppSettings =
      {
        {"KeyVaultName", vault.Name}
      },
      HttpsOnly = true,
      Logs = new AppServiceLogsArgs()
      {
        HttpLogs = new AppServiceLogsHttpLogsArgs()
        {
          FileSystem = new AppServiceLogsHttpLogsFileSystemArgs()
          {
            RetentionInDays = 20,
            RetentionInMb = 30
          }
        }
      }
    });

    // Work around a preview issue https://github.com/pulumi/pulumi-azure/issues/192
    var principalId = app.Identity.Apply(id => id.PrincipalId ?? "11111111-1111-1111-1111-111111111111");

    // Grant App Service access to KV secrets
    var policy = new AccessPolicy("app-policy", new AccessPolicyArgs
    {
      KeyVaultId = vault.Id,
      TenantId = tenantId,
      ObjectId = principalId,
      // The .NET's KeyVault config provider needs the list permission to enumerate the secrets
      SecretPermissions = { "get", "list" },
    });

    // From pulumi secrets
    var dbConnectionStringSecret = new Secret("dbConnectionString", new SecretArgs()
    {
      KeyVaultId = vault.Id,
      Name = "DBConnectionString",
      Value = config.Require("dbConnectionString")
    });

    this.Endpoint = Output.Format($"https://{app.DefaultSiteHostname}");
  }

  [Output]
  public Output<string> Endpoint { get; set; }
}
