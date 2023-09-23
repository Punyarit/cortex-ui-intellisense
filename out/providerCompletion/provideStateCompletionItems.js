"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideStateCompletionItems = void 0;
const vscode = require("vscode");
const propertyValues_1 = require("../constants/propertyValues");
// Step 1: Define a mapping between property names and their possible values.
const propertyValuesMap = {
    bg: propertyValues_1.colors,
    c: propertyValues_1.colors,
    shadow: ['1dp', '2dp', '4dp', '6dp', '8dp', '12dp', '20dp'],
    opacity: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
    border: propertyValues_1.borderValues,
    'border-left': propertyValues_1.borderValues,
    'border-top': propertyValues_1.borderValues,
    'border-right': propertyValues_1.borderValues,
    'border-bottom': propertyValues_1.borderValues,
    outline: propertyValues_1.borderValues,
    'text-decoration': propertyValues_1.allTextDecorationValues,
};
// List of all available properties
const propertyList = [
    'bg',
    'c',
    'outline',
    'shadow',
    'border',
    'border-left',
    'border-top',
    'border-right',
    'border-bottom',
    'text-decoration',
    'opacity',
];
function getPropertyStringValue(attrValue, propName) {
    const match = attrValue.match(new RegExp(`${propName}:([^;]*)`));
    return (match && match[1].trim()) || '';
}
function provideStateCompletionItems(attrValue) {
    var _a;
    // Parsing the attribute value to find out which properties have been used
    const usedProperties = new Set(attrValue
        .split(';')
        .map((part) => part.split(':')[0].trim())
        .filter(Boolean));
    // Filtering the property list to exclude used properties
    const availableProperties = propertyList.filter((prop) => !usedProperties.has(prop));
    // The last part of the attribute value to check if a property has been selected but not yet given a value
    const lastPart = ((_a = attrValue.split(';').pop()) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    const [lastProperty, lastValue] = lastPart.split(':').map((part) => part.trim());
    // Special case for text-decoration
    if (lastProperty === 'text-decoration') {
        const currentTextDecorationValue = getPropertyStringValue(attrValue, 'text-decoration');
        const currentTextDecorationValues = new Set(currentTextDecorationValue.split(' ').concat(lastValue.split(' ')));
        const textDecorationSuggestions = propertyValues_1.allTextDecorationValues.filter((value) => !currentTextDecorationValues.has(value));
        return textDecorationSuggestions.map((suggestion) => new vscode.CompletionItem(suggestion, vscode.CompletionItemKind.Value));
    }
    if (lastProperty && !lastValue && propertyValuesMap[lastProperty]) {
        // If a property has been selected but not yet given a value, suggest values for that property
        return propertyValuesMap[lastProperty].map((value) => new vscode.CompletionItem(value, vscode.CompletionItemKind.Value));
    }
    // If no property is being specified, or a property-value pair has just been completed,
    // suggest the remaining available properties
    return availableProperties.map((prop) => new vscode.CompletionItem(prop, vscode.CompletionItemKind.Text));
}
exports.provideStateCompletionItems = provideStateCompletionItems;
