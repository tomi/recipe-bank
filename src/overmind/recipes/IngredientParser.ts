import { from, Sequence } from 'fromfrom';
import { some, none, isSome } from 'fp-ts/lib/Option';

export const knownUnits = [
  'rkl',
  'tlk',
  'pkt',
  'kg',
  'tl',
  'ml',
  'dl',
  'ps',
  'l',
  'g',
];

export type QuantityRange = {
  from: number;
  to: number;
};

export type Quantity = number | QuantityRange;

export interface ParsedIngredient {
  name: string;
  modifier?: string;
  quantity?: Quantity;
  unit?: string;
}

export interface ParseResult {
  ingredients: ParsedIngredient[];
}

type LineTransform = (line: string) => string;

const qtyRegExp = '\\d+(\\.\\d+)?(\\-\\d+(\\.\\d+)?)?';
const unitRegExp = `(${knownUnits.join('|')})`;

/**
 * Parses ingredients from the given (multi-line) text
 */
export const parseIngredients = (text: string): ParseResult => {
  const ingredients: ParsedIngredient[] = splitToLinesAndTrim(text)
    .map(cleanupLine)
    .map(parseSingleLine)
    .toArray();

  return {
    ingredients,
  };
};

const compose = (...transforms: LineTransform[]) => (str: string) =>
  transforms.reduce((l, transform) => transform(l), str);

const removePossibleListMarkup = (str: string) => str.replace(/^\s*-\s*/, '');

const convertDecimals = (str: string) =>
  str.replace(/½/g, '0.5').replace(/1\/2/g, '0.5').replace(/3\/4/g, '0.75');

const normalizeDashes = (str: string) => str.replace(/–/, '-');

const separateQtyAndUnit = (str: string) => {
  // In case qty, unit and name has all been written together without
  // space, separate quantity out
  const regexp = new RegExp(`(?<before>.*?)(?<qty>${qtyRegExp})(?<rest>.*)`);
  const matches = str.match(regexp);
  if (!matches || !matches.groups) {
    return str;
  }

  const before = matches.groups.before.trim();
  const { qty } = matches.groups;
  const rest = matches.groups.rest.trim();
  const unitAndNameRegExp = new RegExp(
    `^(?<unit>${unitRegExp})(?<name>.*)`,
    'i',
  );

  const unitMatches = rest.match(unitAndNameRegExp);
  if (!unitMatches || !unitMatches.groups) {
    return `${before} ${qty} ${rest}`;
  }

  const { unit, name } = unitMatches.groups;

  return `${before} ${qty} ${unit} ${name}`;
};

const cleanupLine = compose(
  removePossibleListMarkup,
  normalizeDashes,
  convertDecimals,
  separateQtyAndUnit,
);

const parseSingleLine = (line: string) => {
  const words = splitToWords(line);

  const maybeNumeric = trySplitOn(words, isNumeric);
  if (isSome(maybeNumeric)) {
    const { before, match, after } = maybeNumeric.value;

    if (isUnit(after.first())) {
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

const splitToLinesAndTrim = (text: string) =>
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

const isNumeric = (word: string) => new RegExp(`^${qtyRegExp}$`).test(word);
const isNumericWithUnit = (word: string) =>
  new RegExp(`^${qtyRegExp}${unitRegExp}$`).test(word);
const isUnit = (word: string | undefined) =>
  word ? new RegExp(`^${unitRegExp}$`, 'i').test(word) : false;
const not = <T>(fn: any) => (x: T): boolean => !fn(x);

export const parseQty = (qty: string) => {
  if (qty.includes('-')) {
    const [from, to] = qty.split('-');
    return { from: Number(from), to: Number(to) };
  }

  return Number(qty);
};

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
