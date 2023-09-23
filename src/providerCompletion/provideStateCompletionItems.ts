import * as vscode from 'vscode';

// Step 1: Define a mapping between property names and their possible values.
const propertyValuesMap = {
  bg: ['primary-100', 'primary-200', 'primary-300', 'primary-400', 'primary-500'],
  // ... Add mappings for other properties here
};

export function provideStateCompletionItems(attrValue: string): vscode.CompletionItem[] {
  const words = attrValue.split(':').map((word) => word.trim());

  if (words.length === 1) {
    // The user has not yet selected a property, so suggest property names.
    const propertyNames = [
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
    return propertyNames.map(
      (name) => new vscode.CompletionItem(name, vscode.CompletionItemKind.Text)
    );
  } else if (words.length === 2 && words[1] === '') {
    // The user has selected a property, so suggest values for that property.
    const propertyName = words[0];
    const propertyValues = propertyValuesMap[propertyName];
    if (propertyValues) {
      return propertyValues.map(
        (value) => new vscode.CompletionItem(value, vscode.CompletionItemKind.Value)
      );
    }
  }

  return []; // Return an empty array if there's nothing to suggest.
}
