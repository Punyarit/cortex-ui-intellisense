const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

type ColorNames =
  | 'gray'
  | 'primary'
  | 'success'
  | 'green'
  | 'viridian'
  | 'blue'
  | 'blueprint'
  | 'purple'
  | 'pinky'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'error'
  | 'warning';

const colorNames: ColorNames[] = [
  'gray',
  'primary',
  'success',
  'green',
  'viridian',
  'blue',
  'blueprint',
  'purple',
  'pinky',
  'red',
  'orange',
  'yellow',
  'error',
  'warning',
];

const transparentShades = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const systemBackgroundColors = ['bg-primary', 'bg-secondary', 'bg-tertiary'] as const;
const systemTextColors = [
  'tx-primary',
  'tx-secondary',
  'tx-tertiary',
  'tx-link',
  'tx-positive',
  'tx-negative',
] as const;
const systemBorderColors = ['border-primary', 'border-secondary'] as const;

export const colors = [
  'inherit',
  'transparent',
  ...transparentShades.map((shade) => `transparent-${shade}`),
  'white',
  'black',
  ...colorNames.flatMap((name) => shades.map((shade) => `${name}-${shade}`)),
  ...systemBackgroundColors,
  ...systemTextColors,
  ...systemBorderColors,
];

const borderStyles = [
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
] as const;

const generateBorderValues = (borderStyles: ReadonlyArray<string>, colors: string[]) => {
  let borderValues: string[] = [];
  for (let style of borderStyles) {
    for (let color of colors) {
      borderValues.push(`1px ${style} ${color}`);
    }
  }
  return borderValues;
};

export const borderValues = generateBorderValues(borderStyles, colors);
