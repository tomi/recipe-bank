import { from, Sequence } from 'fromfrom';
import { some, none, isSome } from 'fp-ts/lib/Option';

export interface ParsedIngredient {
  name: string;
  modifier?: string;
  quantity?: number;
  unit?: string;
}

export interface ParseResult {
  ingredients: ParsedIngredient[];
}

/**
 * Parses ingredients from the given (multi-line) text
 */
export const parseIngredients = (text: string): ParseResult => {
  const ingredients: ParsedIngredient[] = splitToLines(text)
    .map(parseSingleLine)
    .toArray();

  return {
    ingredients,
  };
};

const parseSingleLine = (line: string) => {
  const words = splitToWords(line);

  const maybeNumeric = trySplitOn(words, isNumeric);
  if (isSome(maybeNumeric)) {
    const { before, match, after } = maybeNumeric.value;

    if (isProbablyUnit(after.first())) {
      return parsedIngredient({
        modifier: joinToModifier(before),
        quantity: parseQty(match),
        unit: after.first(),
        name: joinToName(after.skip(1)),
      });
    }

    return parsedIngredient({
      modifier: joinToModifier(before),
      quantity: parseQty(match),
      name: joinToName(after),
    });
  }

  const maybeNumericWithUnit = trySplitOn(words, isNumericWithUnit);
  if (isSome(maybeNumericWithUnit)) {
    const { before, match, after } = maybeNumericWithUnit.value;
    const { qty, unit } = parseQtyWithUnit(match);

    return parsedIngredient({
      modifier: joinToModifier(before),
      quantity: parseQty(qty),
      unit,
      name: joinToName(after),
    });
  }

  return parsedIngredient({
    name: joinToName(words),
  });
};

const splitToLines = (text: string) =>
  from(text.split(/\r\n|\n/))
    .map((l) => l.trim())
    .filter((l) => !!l);

const splitToWords = (line: string) => from(line.split(/\s+/));

const trySplitOn = (
  words: Sequence<string>,
  predicateFn: (w: string) => boolean,
) =>
  words.some(predicateFn)
    ? some({
        before: words.takeWhile(not(predicateFn)),
        match: words.find(predicateFn)!,
        after: words.skipWhile(not(predicateFn)).skip(1),
      })
    : none;

const isNumeric = (word: string) => /^\d+$/.test(word);
const isNumericWithUnit = (word: string) => /^\d+\w+$/.test(word);
const isProbablyUnit = (word: string | undefined) =>
  word ? word.length <= 3 && /\w+/.test(word) : false;
const not = <T>(fn: any) => (x: T): boolean => !fn(x);

const parseQty = (qty: string) => parseInt(qty, 10);

const parseQtyWithUnit = (qtyWithUnit: string) => ({
  qty: from(qtyWithUnit).takeWhile(isNumeric).toArray().join(''),
  unit: from(qtyWithUnit).skipWhile(isNumeric).toArray().join(''),
});

const joinToModifier = (words: Sequence<string>) =>
  words.isEmpty() ? undefined : words.toArray().join(' ');

const joinToName = (words: Sequence<string>) => words.toArray().join(' ');

const parsedIngredient = ({
  name,
  modifier,
  quantity,
  unit,
}: ParsedIngredient): ParsedIngredient => ({
  name,
  ...(modifier && { modifier }),
  ...(quantity && { quantity }),
  ...(unit && { unit }),
});
