"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providePropertyCompletionItems = void 0;
const vscode = require("vscode");
const propertyValues_1 = require("../constants/propertyValues");
function providePropertyCompletionItems(attrName, attrValue) {
    // Check if the attribute name is one of the targeted properties
    if (propertyValues_1.propertyValuesMap[attrName]) {
        // If it is, provide suggestions based on the current value of the attribute
        const usedValues = new Set(attrValue
            .split(' ')
            .map((value) => value.trim())
            .filter(Boolean));
        // Filter out the used values from the possible values for this property
        const availableValues = propertyValues_1.propertyValuesMap[attrName].filter((value) => !usedValues.has(value));
        // Provide the available values as suggestions
        return availableValues.map((value) => new vscode.CompletionItem(value, vscode.CompletionItemKind.Value));
    }
    // If the attribute name is not one of the targeted properties, return an empty array
    return [];
}
exports.providePropertyCompletionItems = providePropertyCompletionItems;
