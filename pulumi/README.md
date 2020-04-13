# Infrastructure

The Azure provider requires that you've logged in as a Service Principal and its credentials are in environment:

```bash
cp .env-example .env
```

Also need to configure the DB connection string manually:

```bash
pulumi config set --secret dbConnectionString $DB_CONNECTION_STRING
```

Currently the state is hosted in the Pulumi cloud.

## Deploy

```bash
pulumi up
```

## Destroy

```bash
pulumi destroy
```
