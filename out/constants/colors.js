"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borderValues = exports.colors = void 0;
const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const colorNames = [
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
const transparentShades = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const systemBackgroundColors = ['bg-primary', 'bg-secondary', 'bg-tertiary'];
const systemTextColors = [
    'tx-primary',
    'tx-secondary',
    'tx-tertiary',
    'tx-link',
    'tx-positive',
    'tx-negative',
];
const systemBorderColors = ['border-primary', 'border-secondary'];
exports.colors = [
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
];
const generateBorderValues = (borderStyles, colors) => {
    let borderValues = [];
    for (let style of borderStyles) {
        for (let color of colors) {
            borderValues.push(`1px ${style} ${color}`);
        }
    }
    return borderValues;
};
exports.borderValues = generateBorderValues(borderStyles, exports.colors);
