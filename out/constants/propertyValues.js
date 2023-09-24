"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyValuesMap = exports.propertyStateValuesMap = exports.propertyStatesList = exports.getTextDecorationSuggestions = exports.allTextDecorationValues = exports.borderValues = exports.colors = void 0;
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
exports.allTextDecorationValues = [
    'dashed',
    'dotted',
    'double',
    'line-through',
    'overline',
    'solid',
    'underline',
    'none',
];
const getTextDecorationSuggestions = (currentValue) => {
    const usedValues = new Set(currentValue.split(' '));
    return exports.allTextDecorationValues.filter((value) => !usedValues.has(value));
};
exports.getTextDecorationSuggestions = getTextDecorationSuggestions;
const shadowValue = ['1dp', '2dp', '4dp', '6dp', '8dp', '12dp', '20dp'];
const opacityValue = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'];
const transformValue = [
    'none',
    'matrix(n,n,n,n,n,n)',
    'matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)',
    'translate(x,y)',
    'translate3d(x,y,z)',
    'translateX(x)',
    'translateY(y)',
    'translateZ(z)',
    'scale(x,y)',
    'scale3d(x,y,z)',
    'scaleX(x)',
    'scaleY(y)',
    'scaleZ(z)',
    'rotate(angle)',
    'rotate3d(x,y,z,angle)',
    'rotateX(angle)',
    'rotateY(angle)',
    'rotateZ(angle)',
    'skew(x-angle,y-angle)',
    'skewX(angle)',
    'skewY(angle)',
    'perspective(n)',
    'initial',
    'inherit',
];
// List of all available properties
exports.propertyStatesList = [
    'bg',
    'c',
    'shadow',
    'opacity',
    'border',
    'border-left',
    'border-top',
    'border-right',
    'border-bottom',
    'outline',
    'text-decoration',
    'transform',
];
exports.propertyStateValuesMap = {
    bg: exports.colors,
    c: exports.colors,
    shadow: shadowValue,
    opacity: opacityValue,
    border: exports.borderValues,
    'border-left': exports.borderValues,
    'border-top': exports.borderValues,
    'border-right': exports.borderValues,
    'border-bottom': exports.borderValues,
    outline: exports.borderValues,
    'text-decoration': exports.allTextDecorationValues,
    transform: transformValue,
};
exports.propertyValuesMap = {
    border: exports.borderValues,
    'border-left': exports.borderValues,
    'border-top': exports.borderValues,
    'border-right': exports.borderValues,
    'border-bottom': exports.borderValues,
    outline: exports.borderValues,
    'text-decoration': exports.allTextDecorationValues,
    transform: transformValue,
    transition: ['0.375s ease', '0.412s ease', '0.450s ease'],
};
