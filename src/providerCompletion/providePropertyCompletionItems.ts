import * as vscode from 'vscode';
import { borderValues, allTextDecorationValues } from '../constants/propertyValues';

const propertyValuesMap = {
  border: borderValues,
  'border-left': borderValues,
  'border-top': borderValues,
  'border-right': borderValues,
  'border-bottom': borderValues,
  outline: borderValues,
  'text-decoration': allTextDecorationValues,
};

export function providePropertyCompletionItems(
  attrName: string,
  attrValue: string
): vscode.CompletionItem[] {
  // Check if the attribute name is one of the targeted properties
  if (propertyValuesMap[attrName]) {
    // If it is, provide suggestions based on the current value of the attribute
    const usedValues = new Set(
      attrValue
        .split(' ')
        .map((value) => value.trim())
        .filter(Boolean)
    );

    // Filter out the used values from the possible values for this property
    const availableValues = propertyValuesMap[attrName].filter((value) => !usedValues.has(value));

    // Provide the available values as suggestions
    return availableValues.map(
      (value) => new vscode.CompletionItem(value, vscode.CompletionItemKind.Value)
    );
  }

  // If the attribute name is not one of the targeted properties, return an empty array
  return [];
}
