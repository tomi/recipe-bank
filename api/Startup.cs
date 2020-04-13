using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RecipeBankApi.Data;

namespace RecipeBankApi
{
  public class Startup
  {
    string allowAllCorsPolicy = "AllowAll";

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy(allowAllCorsPolicy, builder =>
        {
          builder.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
        });
      });

      services.AddControllers()
        .AddJsonOptions(options =>
        {
          options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter(allowIntegerValues: false));
        });

      services.AddDbContext<RecipeContext>(options =>
        options.UseNpgsql(
          Configuration.GetValue<string>(
            "DBConnectionString",
            "Host=localhost;Database=recipebank;Username=recipebank;Password=recipebank"
          )));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors(allowAllCorsPolicy);

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
