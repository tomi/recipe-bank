using System.ComponentModel.DataAnnotations;

namespace RecipeBankApi.Model
{
  public class CreateRecipeIngredientDto
  {
    public int Order { get; set; }
    public string IngredientText { get; set; }
    public long? IngredientId { get; set; }
    public decimal? Quantity { get; set; }
    public string Modifier { get; set; }
    public string Unit { get; set; }
  }


  public class CreateRecipeDto
  {
    [Required]
    public string Name { get; set; }
    public CookingDuration CookingDuration { get; set; }
    [Required]
    public int NumPortions { get; set; }
    [Required]
    public string Instructions { get; set; }
    public string Tags { get; set; }
    public string[] Categories { get; set; }
    public CreateRecipeIngredientDto[] Ingredients { get; set; }
  }
}
