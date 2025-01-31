"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const completionItem_1 = __importDefault(require("../modules/completionItem"));
const directivesInfo_1 = __importDefault(require("../static/info/directivesInfo"));
const directivesSnippets_1 = __importDefault(require("../static/snippets/directivesSnippets"));
const Cursor_1 = __importDefault(require("../modules/Cursor"));
const DIR_START_REG = /(?<!\\)@(\w*)$/;
const IGNORE_REG = /\\\{\{/g;
const START_REG = /\{\{/g;
const END_REG = /\}\}/g;
const triggerChars = ['@'];
exports.default = vscode.languages.registerCompletionItemProvider({ language: 'textwire' }, {
    provideCompletionItems(doc, pos) {
        const range = new vscode.Range(pos.with(pos.line, 0), pos);
        const textBefore = doc.getText(range);
        const match = DIR_START_REG.exec(textBefore);
        const cursor = new Cursor_1.default(pos, doc);
        if (!match || cursor.isBetween(START_REG, END_REG, IGNORE_REG)) {
            return [];
        }
        const partialDir = match[1];
        const field = vscode.CompletionItemKind.Snippet;
        const dirs = [
            (0, completionItem_1.default)('@if', directivesInfo_1.default.if, field, directivesSnippets_1.default.if),
            (0, completionItem_1.default)('@if @else', directivesInfo_1.default.ifElse, field, directivesSnippets_1.default.ifElse),
            (0, completionItem_1.default)('@if @elseif', directivesInfo_1.default.ifElseif, field, directivesSnippets_1.default.ifElseif),
            (0, completionItem_1.default)('@use', directivesInfo_1.default.use, field, directivesSnippets_1.default.use),
            (0, completionItem_1.default)('@insert', directivesInfo_1.default.insert, field, directivesSnippets_1.default.insert),
            (0, completionItem_1.default)('@insert @end', directivesInfo_1.default.insertEnd, field, directivesSnippets_1.default.insertEnd),
            (0, completionItem_1.default)('@reserve', directivesInfo_1.default.reserve, field, directivesSnippets_1.default.reserve),
            (0, completionItem_1.default)('@component', directivesInfo_1.default.comp, field, directivesSnippets_1.default.comp),
            (0, completionItem_1.default)('@component @slot', directivesInfo_1.default.compSlot, field, directivesSnippets_1.default.compSlot),
            (0, completionItem_1.default)('@slot', directivesInfo_1.default.slot, field, directivesSnippets_1.default.slotDef),
            (0, completionItem_1.default)('@slot(name)', directivesInfo_1.default.slotDef, field, directivesSnippets_1.default.slot),
            (0, completionItem_1.default)('@each', directivesInfo_1.default.each, field, directivesSnippets_1.default.each),
            (0, completionItem_1.default)('@each @else', directivesInfo_1.default.eachElse, field, directivesSnippets_1.default.eachElse),
            (0, completionItem_1.default)('@for', directivesInfo_1.default.for, field, directivesSnippets_1.default.for),
            (0, completionItem_1.default)('@for @else', directivesInfo_1.default.forElse, field, directivesSnippets_1.default.forElse),
            (0, completionItem_1.default)('@dump', directivesInfo_1.default.dump, field, directivesSnippets_1.default.dump),
            (0, completionItem_1.default)('@end', directivesInfo_1.default.end, field, directivesSnippets_1.default.end),
            (0, completionItem_1.default)('@break', directivesInfo_1.default.break, field, directivesSnippets_1.default.break),
            (0, completionItem_1.default)('@continue', directivesInfo_1.default.continue, field, directivesSnippets_1.default.continue),
            (0, completionItem_1.default)('@continueIf', directivesInfo_1.default.continueIf, field, directivesSnippets_1.default.continueIf),
            (0, completionItem_1.default)('@breakIf', directivesInfo_1.default.breakIf, field, directivesSnippets_1.default.breakIf),
        ];
        return dirs.filter(d => d.label.slice(1).startsWith(partialDir));
    },
}, ...triggerChars);
