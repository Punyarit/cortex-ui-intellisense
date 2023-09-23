"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providePropertyCompletionItems = void 0;
const vscode = require("vscode");
const propertyValues_1 = require("../constants/propertyValues");
const propertyValuesMap = {
    border: propertyValues_1.borderValues,
    'border-left': propertyValues_1.borderValues,
    'border-top': propertyValues_1.borderValues,
    'border-right': propertyValues_1.borderValues,
    'border-bottom': propertyValues_1.borderValues,
    outline: propertyValues_1.borderValues,
    'text-decoration': propertyValues_1.allTextDecorationValues,
};
function providePropertyCompletionItems(attrName, attrValue) {
    // Check if the attribute name is one of the targeted properties
    if (propertyValuesMap[attrName]) {
        // If it is, provide suggestions based on the current value of the attribute
        const usedValues = new Set(attrValue
            .split(' ')
            .map((value) => value.trim())
            .filter(Boolean));
        // Filter out the used values from the possible values for this property
        const availableValues = propertyValuesMap[attrName].filter((value) => !usedValues.has(value));
        // Provide the available values as suggestions
        return availableValues.map((value) => new vscode.CompletionItem(value, vscode.CompletionItemKind.Value));
    }
    // If the attribute name is not one of the targeted properties, return an empty array
    return [];
}
exports.providePropertyCompletionItems = providePropertyCompletionItems;
