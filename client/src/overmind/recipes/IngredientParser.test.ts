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

    it('parses ingredient without unit but with name that has known units', () => {
      expect(parseIngredients('1 valkosipulinkynttä')).toEqual({
        ingredients: [{ quantity: 1, name: 'valkosipulinkynttä' }],
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

    it('parses 1/2 as 0.5', () => {
      expect(parseIngredients('1/2 pkt makkaraa')).toEqual({
        ingredients: [{ quantity: 0.5, unit: 'pkt', name: 'makkaraa' }],
      });
    });

    it('parses 1/4 as 0.25', () => {
      expect(parseIngredients('1/4 tl suolaa')).toEqual({
        ingredients: [{ quantity: 0.25, unit: 'tl', name: 'suolaa' }],
      });
    });

    it('parses 3/4 as 0.75', () => {
      expect(parseIngredients('3/4 tl suolaa')).toEqual({
        ingredients: [{ quantity: 0.75, unit: 'tl', name: 'suolaa' }],
      });
    });

    it('parses everything put together', () => {
      expect(parseIngredients('1rklöljyä')).toEqual({
        ingredients: [{ quantity: 1, unit: 'rkl', name: 'öljyä' }],
      });
    });

    it('parses ingredient with double quantity', () => {
      expect(parseIngredients('1(100 g)sipuli')).toEqual({
        ingredients: [{ quantity: 1, name: '(100 g)sipuli' }],
      });
    });

    it('parses quanity range', () => {
      expect(parseIngredients('2-3 omenaa')).toEqual({
        ingredients: [{ quantity: { from: 2, to: 3 }, name: 'omenaa' }],
      });
    });

    it('parses quanity range with unit', () => {
      expect(parseIngredients('1/2-1tl pippuria')).toEqual({
        ingredients: [
          { quantity: { from: 0.5, to: 1 }, unit: 'tl', name: 'pippuria' },
        ],
      });
    });

    it("does not parse units it doesn't know", () => {
      expect(parseIngredients('1 iso sipuli')).toEqual({
        ingredients: [{ quantity: 1, name: 'iso sipuli' }],
      });
    });

    it('parses dot as a separator', () => {
      expect(parseIngredients('1.5 porkkanaa')).toEqual({
        ingredients: [{ quantity: 1.5, name: 'porkkanaa' }],
      });
    });

    it('parses comma as a separator', () => {
      expect(parseIngredients('1,5 porkkanaa')).toEqual({
        ingredients: [{ quantity: 1.5, name: 'porkkanaa' }],
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
