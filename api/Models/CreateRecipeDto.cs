using System.ComponentModel.DataAnnotations;

namespace RecipeBankApi.Model
{
  public class CreateRecipeIngredientDto
  {
    public int Order { get; set; }
    [Required]
    public string IngredientText { get; set; }
    public long? IngredientId { get; set; }
    public decimal? MinQuantity { get; set; }
    public decimal? MaxQuantity { get; set; }
    public string Modifier { get; set; }
    public string Unit { get; set; }
  }


  public class CreateRecipeDto
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public CookingDuration Duration { get; set; }
    [Required]
    public int NumPortions { get; set; }
    [Required]
    public string Instructions { get; set; }
    public string Tags { get; set; }
    [Required]
    public string[] Categories { get; set; }
    [Required]
    public CreateRecipeIngredientDto[] Ingredients { get; set; }
  }
}
