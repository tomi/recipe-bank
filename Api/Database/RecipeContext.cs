using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RecipeBankApi.Model;

namespace RecipeBankApi.Data
{
  public class RecipeContext : DbContext
  {
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    public RecipeContext(DbContextOptions<RecipeContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Recipe>().ToTable("Recipe");
      modelBuilder.Entity<RecipeIngredient>().ToTable("RecipeIngredient");
    }
  }
}