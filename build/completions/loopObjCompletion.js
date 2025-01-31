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
const loopInfo_1 = __importDefault(require("../static/info/loopInfo"));
const Cursor_1 = __importDefault(require("../modules/Cursor"));
const IGNORE_REG = /{{--\s*@(each|for)/g;
const START_REG = /@(each|for)/g;
const END_REG = /@end/g;
const LOOP_VAR_REG = /\bloop\./g;
const triggerChars = ['.', 'l'];
exports.default = vscode.languages.registerCompletionItemProvider({ language: 'textwire' }, {
    provideCompletionItems(doc, pos) {
        const cursor = new Cursor_1.default(pos, doc);
        if (cursor.notBetween(START_REG, END_REG, IGNORE_REG)) {
            return [];
        }
        if (cursor.prevCharIs('l')) {
            const field = vscode.CompletionItemKind.Variable;
            return [(0, completionItem_1.default)('loop', loopInfo_1.default.loop, field)];
        }
        const range = new vscode.Range(pos.with(pos.line, 0), pos);
        const textBefore = doc.getText(range);
        const match = LOOP_VAR_REG.test(textBefore.trim());
        if (!match) {
            return [];
        }
        const field = vscode.CompletionItemKind.Field;
        return [
            (0, completionItem_1.default)('index', loopInfo_1.default.index, field),
            (0, completionItem_1.default)('first', loopInfo_1.default.first, field),
            (0, completionItem_1.default)('last', loopInfo_1.default.last, field),
            (0, completionItem_1.default)('iter', loopInfo_1.default.iter, field),
        ];
    },
}, ...triggerChars);
