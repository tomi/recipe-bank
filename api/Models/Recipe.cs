using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecipeBankApi.Model
{
  public enum CookingDuration
  {
    LessThan15,
    Between15And30,
    Between30And60,
    Between60to90,
    Between90to120,
    Between2to3hrs,
    Between3to6hrs,
    Between6to12hrs,
    Between12to24hrs,
    Over24hrs,
  }

  public class Recipe
  {
    public long Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public CookingDuration Duration { get; set; }
    [Required]
    public int NumPortions { get; set; }
    [Required]
    public string Instructions { get; set; }
    public string[] Categories { get; set; }
    public string Tags { get; set; }
    public string OriginalUrl { get; set; }
    public ICollection<RecipeIngredient> Ingredients { get; set; }

  }
}