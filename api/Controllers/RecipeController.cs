using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RecipeBankApi.Data;
using RecipeBankApi.Model;

namespace RecipeBankApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class RecipeController : ControllerBase
  {
    private readonly ILogger<RecipeController> _logger;
    private readonly RecipeContext _context;

    public RecipeController(ILogger<RecipeController> logger, RecipeContext context)
    {
      _logger = logger;
      _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Recipe>> ListRecipes()
    {
      var recipes = await _context.Recipes
        .Include(r => r.Ingredients)
        .ToListAsync();

      return recipes;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipe(long id)
    {
      var recipe = await _context.Recipes.FindAsync(id);

      if (recipe == null)
      {
        return NotFound();
      }

      return recipe;
    }

    [HttpPost]
    public async Task<ActionResult<Recipe>> PostRecipe([FromBody] CreateRecipeDto toCreate)
    {
      var recipe = new Recipe()
      {
        Duration = toCreate.Duration,
        Instructions = toCreate.Instructions,
        Name = toCreate.Name,
        OriginalUrl = toCreate.OriginalUrl,
        NumPortions = toCreate.NumPortions,
        Categories = toCreate.Categories,
        Tags = toCreate.Tags,
        Ingredients = toCreate.Ingredients.Select(dto => new RecipeIngredient()
        {
          IngredientText = dto.IngredientText,
          Modifier = dto.Modifier,
          Order = dto.Order,
          MinQuantity = dto.MinQuantity,
          MaxQuantity = dto.MaxQuantity,
          IngredientId = dto.IngredientId,
          Unit = dto.Unit
        }).ToList()
      };

      _context.Recipes.Add(recipe);

      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
    }
  }
}
