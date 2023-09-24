import * as vscode from 'vscode';
import { provideBreakpointCompletionItems } from './providerCompletion/provideBreakpointCompletionItems';
import { provideStateCompletionItems } from './providerCompletion/provideStateCompletionItems';
import { providePropertyCompletionItems } from './providerCompletion/providePropertyCompletionItems'; // Assume this is the path to your function

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: 'typescriptreact', scheme: 'file' },
      {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
          const line = document.lineAt(position);
          const lineText = line.text.substring(0, position.character);

          // Check for breakpoints
          const breakpointRegex = /(?:xs|sm|md|lg|xl)=["']([^"']*)$/;
          const breakpointMatch = lineText.match(breakpointRegex);
          if (breakpointMatch) {
            const attrValue = breakpointMatch[1];
            return provideBreakpointCompletionItems(attrValue);
          }

          // Check for state attributes
          const stateRegex = /(?:active|focus|focus-within|hover)=["']([^"']*)$/;
          const stateMatch = lineText.match(stateRegex);
          if (stateMatch) {
            const attrValue = stateMatch[1];
            return provideStateCompletionItems(attrValue);
          }

          // Check for border or text-decoration properties
          const propertyRegex =
            /(?:border|border-left|border-top|border-right|border-bottom|outline|text-decoration|transform|transition)=["']([^"']*)$/;
          const propertyMatch = lineText.match(propertyRegex);
          if (propertyMatch) {
            const attrName = propertyMatch[0].split('=')[0]; // Get the attribute name
            const attrValue = propertyMatch[1]; // Get the attribute value
            return providePropertyCompletionItems(attrName, attrValue);
          }
        },
      },
      ' ', // Trigger character
      '"', // Additional trigger character
      ':' // Additional trigger character
    )
  );
}

export function deactivate() {}
