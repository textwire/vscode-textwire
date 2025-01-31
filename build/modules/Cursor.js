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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
class Cursor {
    constructor(pos, doc) {
        this.pos = pos;
        this.doc = doc;
    }
    prevChar() {
        return this.doc.getText(new vscode.Range(this.pos.translate(0, -1), this.pos));
    }
    prevCharIs(char) {
        return this.prevChar() === char;
    }
    isBetween(startReg, endReg, ignoreReg) {
        const textBefore = this.textBefore();
        if (ignoreReg.test(textBefore)) {
            return false;
        }
        const startMatches = Array.from(textBefore.matchAll(startReg));
        const endMatches = Array.from(textBefore.matchAll(endReg));
        const lastStart = startMatches.pop() || false;
        const lastEnd = endMatches.pop() || false;
        return lastStart && (!lastEnd || lastStart.index > lastEnd.index);
    }
    notBetween(startReg, endReg, ignoreReg) {
        return !this.isBetween(startReg, endReg, ignoreReg);
    }
    textBefore() {
        return this.doc.getText(new vscode.Range(new vscode.Position(0, 0), this.pos));
    }
}
exports.default = Cursor;
