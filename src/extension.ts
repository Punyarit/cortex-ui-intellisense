import * as vscode from 'vscode';
import { provideBreakpointCompletionItems } from './providerCompletion/provideBreakpointCompletionItems';
import { provideStateCompletionItems } from './providerCompletion/provideStateCompletionItems'

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
            return provideBreakpointCompletionItems(attrValue); // Assuming this function is defined elsewhere
          }

          // Check for state attributes
          const stateRegex = /(?:active|focus|focus-within|hover)=["']([^"']*)$/;
          const stateMatch = lineText.match(stateRegex);
          if (stateMatch) {
            const attrValue = stateMatch[1];
            return provideStateCompletionItems(attrValue);
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
