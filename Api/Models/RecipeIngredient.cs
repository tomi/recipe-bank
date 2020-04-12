using System.ComponentModel.DataAnnotations;

namespace RecipeBankApi.Model
{
  public class RecipeIngredient
  {
    public long RecipeIngredientId { get; set; }
    public long RecipeId { get; set; }
    public int Order { get; set; }
    [Required]
    public string IngredientText { get; set; }
    public long? IngredientId { get; set; }
    public decimal? Quantity { get; set; }
    public string Modifier { get; set; }
    public string Unit { get; set; }
  }
}
