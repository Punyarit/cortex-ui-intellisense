"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function provideBreakpointCompletionItems(attrValue) {
    const displayGroup = ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'];
    const justifyGroup = [
        'justify-start',
        'justify-center',
        'justify-end',
        'justify-between',
        'justify-around',
        'justify-evenly',
    ];
    const itemsGroup = [
        'items-start',
        'items-end',
        'items-center',
        'items-baseline',
        'items-stretch',
    ];
    const propertyList = [
        'p',
        'pt',
        'pr',
        'pb',
        'pl',
        'px',
        'py',
        'gap',
        'basis',
        'transform',
        'left',
        'top',
        'right',
        'bottom',
        'm',
        'mt',
        'mr',
        'mb',
        'ml',
        'mx',
        'my',
        'w',
        'min-w',
        'max-w',
        'h',
        'min-h',
        'max-h',
        'col-gap',
        'row-gap',
        'grid-cols',
        'col-span',
        'col-start',
        'col-end',
        'grid-rows',
        'row-span',
        'row-start',
        'row-end',
    ];
    const wordsUsed = attrValue
        .split(';')
        .map((word) => word.trim())
        .filter(Boolean); // Get all words used so far
    let suggestions = [...displayGroup, ...justifyGroup, ...itemsGroup, ...propertyList]; // Start with all suggestions
    // Remove suggestions from a group if one from that group is already used
    if (wordsUsed.some((word) => displayGroup.includes(word))) {
        suggestions = suggestions.filter((word) => !displayGroup.includes(word));
    }
    if (wordsUsed.some((word) => justifyGroup.includes(word))) {
        suggestions = suggestions.filter((word) => !justifyGroup.includes(word));
    }
    if (wordsUsed.some((word) => itemsGroup.includes(word))) {
        suggestions = suggestions.filter((word) => !itemsGroup.includes(word));
    }
    // Remove property suggestions if they've already been used
    wordsUsed.forEach((word) => {
        const property = word.split(':')[0];
        suggestions = suggestions.filter((suggestion) => suggestion !== property);
    });
    // Map suggestions to an array of CompletionItem objects
    const completionItems = suggestions.map((word) => {
        const completionItem = new vscode.CompletionItem(word, vscode.CompletionItemKind.Text);
        // For properties, append a colon
        if (propertyList.includes(word)) {
            completionItem.insertText = word + ':';
        }
        else {
            completionItem.insertText = word;
        }
        return completionItem;
    });
    return completionItems;
}
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'typescriptreact', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            const line = document.lineAt(position);
            const lineText = line.text.substring(0, position.character);
            const regex = /(?:xs|sm|md|lg|xl)=["']([^"']*)$/;
            const match = lineText.match(regex);
            if (match) {
                const attrValue = match[1]; // Get the value of the attribute
                return provideBreakpointCompletionItems(attrValue);
            }
        },
    }, ' ', // Trigger character
    '"' // Additional trigger character
    ));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
