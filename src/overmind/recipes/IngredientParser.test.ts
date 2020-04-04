import { parseIngredients } from './IngredientParser';

describe('IngredientParser', () => {
  describe('Single ingredients', () => {
    it('parses simple single ingredient', () => {
      expect(parseIngredients('mustapippuria')).toEqual({
        ingredients: [{ name: 'mustapippuria' }],
      });
    });

    it('parses ingredient with quantity', () => {
      expect(parseIngredients('2 porkkanaa')).toEqual({
        ingredients: [{ quantity: 2, name: 'porkkanaa' }],
      });
    });

    it('parses ingredient with quantity and unit', () => {
      expect(parseIngredients('250 g pinaattia')).toEqual({
        ingredients: [{ quantity: 250, unit: 'g', name: 'pinaattia' }],
      });
    });

    it('parses ingredient with quantity and unit together', () => {
      expect(parseIngredients('250g pinaattia')).toEqual({
        ingredients: [{ quantity: 250, unit: 'g', name: 'pinaattia' }],
      });
    });

    it('parses ingredient with modifier', () => {
      expect(parseIngredients('n. 1l vettä')).toEqual({
        ingredients: [
          { modifier: 'n.', quantity: 1, unit: 'l', name: 'vettä' },
        ],
      });
    });

    it('removes possible dash in front of the ingredient', () => {
      expect(parseIngredients('- 1l vettä')).toEqual({
        ingredients: [{ quantity: 1, unit: 'l', name: 'vettä' }],
      });
    });

    it('parses ½ as 0.5', () => {
      expect(parseIngredients('½ pkt makkaraa')).toEqual({
        ingredients: [{ quantity: 0.5, unit: 'pkt', name: 'makkaraa' }],
      });
    });
  });

  describe('Multiple ingredients', () => {
    it('parses multiple ingredients', () => {
      const toParse = `
        7 isohkoa perunaa
        3 porkkanaa
        n. 1l vettä
      `;
      expect(parseIngredients(toParse)).toEqual({
        ingredients: [
          { quantity: 7, name: 'isohkoa perunaa' },
          { quantity: 3, name: 'porkkanaa' },
          { modifier: 'n.', quantity: 1, unit: 'l', name: 'vettä' },
        ],
      });
    });
  });
});
