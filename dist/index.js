"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const axios_1 = __importDefault(require("axios"));
const console_1 = require("console");
const marked_1 = require("marked");
const marked_terminal_1 = __importDefault(require("marked-terminal"));
const client = axios_1.default.create({
    baseURL: "https://api.stackexchange.com/2.3",
});
marked_1.marked.setOptions({
    renderer: new marked_terminal_1.default(),
});
const main = async (e) => {
    const error = { error: e.stack.split("\n") };
    const err = error.error[0];
    const res = await client.get(`/search/advanced?order=desc&sort=relevance&q=${err}&closed=True&site=stackoverflow&filter=!nOedRLr0Wi`);
    const data = res.data;
    const ansId = data.items
        .map((i) => {
        return i.accepted_answer_id;
    })
        .filter((i) => i !== undefined)
        .slice(0, 3)
        .join(";");
    const ans = await client.get(`/answers/${ansId}?order=desc&sort=activity&site=stackoverflow&filter=!nOedRLr0Wi`);
    ans.data.items.forEach((i) => {
        (0, console_1.log)("ans you might found about this  \n", (0, marked_1.marked)(i.body_markdown, {
            gfm: true,
            breaks: true,
        }));
    });
};
exports.main = main;
//# sourceMappingURL=index.js.map