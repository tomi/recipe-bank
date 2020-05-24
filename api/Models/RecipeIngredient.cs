using System.ComponentModel.DataAnnotations;

namespace RecipeBankApi.Model
{
  public class RecipeIngredient
  {
    public long Id { get; set; }
    public long RecipeId { get; set; }
    [Required]
    public int Order { get; set; }
    [Required]
    public string IngredientText { get; set; }
    public long? IngredientId { get; set; }
    public decimal? MinQuantity { get; set; }
    public decimal? MaxQuantity { get; set; }
    public string Modifier { get; set; }
    public string Unit { get; set; }
  }
}
