"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPDA = void 0;
const web3_js_1 = require("@solana/web3.js");
function findPDA(host, seed, program) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield web3_js_1.PublicKey.findProgramAddress([Buffer.from('v1'), Buffer.from(seed), host.toBuffer()], program.programId);
    });
}
exports.findPDA = findPDA;
