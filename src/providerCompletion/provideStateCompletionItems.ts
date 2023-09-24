import * as vscode from 'vscode';
import { allTextDecorationValues, propertyStateValuesMap, propertyStatesList } from '../constants/propertyValues';

function getPropertyStringValue(attrValue: string, propName: string): string {
  const match = attrValue.match(new RegExp(`${propName}:([^;]*)`));
  return (match && match[1].trim()) || '';
}

export function provideStateCompletionItems(attrValue: string): vscode.CompletionItem[] {
  // Parsing the attribute value to find out which properties have been used
  const usedProperties = new Set(
    attrValue
      .split(';')
      .map((part) => part.split(':')[0].trim())
      .filter(Boolean)
  );

  // Filtering the property list to exclude used properties
  const availableProperties = propertyStatesList.filter((prop) => !usedProperties.has(prop));

  // The last part of the attribute value to check if a property has been selected but not yet given a value
  const lastPart = attrValue.split(';').pop()?.trim() || '';
  const [lastProperty, lastValue] = lastPart.split(':').map((part) => part.trim());

  // Special case for text-decoration
  if (lastProperty === 'text-decoration') {
    const currentTextDecorationValue = getPropertyStringValue(attrValue, 'text-decoration');
    const currentTextDecorationValues = new Set(
      currentTextDecorationValue.split(' ').concat(lastValue.split(' '))
    );
    const textDecorationSuggestions = allTextDecorationValues.filter(
      (value) => !currentTextDecorationValues.has(value)
    );
    return textDecorationSuggestions.map(
      (suggestion) => new vscode.CompletionItem(suggestion, vscode.CompletionItemKind.Value)
    );
  }

  if (lastProperty && !lastValue && propertyStateValuesMap[lastProperty]) {
    // If a property has been selected but not yet given a value, suggest values for that property
    return propertyStateValuesMap[lastProperty].map(
      (value) => new vscode.CompletionItem(value, vscode.CompletionItemKind.Value)
    );
  }

  // If no property is being specified, or a property-value pair has just been completed,
  // suggest the remaining available properties
  return availableProperties.map(
    (prop) => new vscode.CompletionItem(prop, vscode.CompletionItemKind.Text)
  );
}
