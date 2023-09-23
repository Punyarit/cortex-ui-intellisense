"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'typescriptreact', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            const line = document.lineAt(position);
            const lineText = line.text.substring(0, position.character);
            if (lineText.endsWith('hover="')) {
                const completionItem = new vscode.CompletionItem('bg', vscode.CompletionItemKind.Text);
                completionItem.insertText = 'bg';
                return [completionItem];
            }
        },
    }, '"' // Trigger character
    ));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
