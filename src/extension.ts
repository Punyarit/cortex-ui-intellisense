import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: 'typescriptreact', scheme: 'file' },
      {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
          const line = document.lineAt(position);
          const lineText = line.text.substring(0, position.character);
          if (lineText.endsWith('hover="')) {
            const completionItem = new vscode.CompletionItem('bg', vscode.CompletionItemKind.Text);
            completionItem.insertText = 'bg';
            return [completionItem];
          }
        },
      },
      '"' // Trigger character
    )
  );
}

export function deactivate() {}
