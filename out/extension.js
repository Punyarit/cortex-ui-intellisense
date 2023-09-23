"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const provideBreakpointCompletionItems_1 = require("./providerCompletion/provideBreakpointCompletionItems");
const provideStateCompletionItems_1 = require("./providerCompletion/provideStateCompletionItems");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'typescriptreact', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            const line = document.lineAt(position);
            const lineText = line.text.substring(0, position.character);
            // Check for breakpoints
            const breakpointRegex = /(?:xs|sm|md|lg|xl)=["']([^"']*)$/;
            const breakpointMatch = lineText.match(breakpointRegex);
            if (breakpointMatch) {
                const attrValue = breakpointMatch[1];
                return (0, provideBreakpointCompletionItems_1.provideBreakpointCompletionItems)(attrValue); // Assuming this function is defined elsewhere
            }
            // Check for state attributes
            const stateRegex = /(?:active|focus|focus-within|hover)=["']([^"']*)$/;
            const stateMatch = lineText.match(stateRegex);
            if (stateMatch) {
                const attrValue = stateMatch[1];
                return (0, provideStateCompletionItems_1.provideStateCompletionItems)(attrValue);
            }
        },
    }, ' ', // Trigger character
    '"', // Additional trigger character
    ':' // Additional trigger character
    ));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
