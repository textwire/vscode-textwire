"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const loopObjCompletion_1 = __importDefault(require("./completions/loopObjCompletion"));
const directiveCompletion_1 = __importDefault(require("./completions/directiveCompletion"));
function activate(ctx) {
    ctx.subscriptions.push(loopObjCompletion_1.default, directiveCompletion_1.default);
}
function deactivate() { }
