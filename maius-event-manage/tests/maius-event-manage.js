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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const anchor = __importStar(require("@project-serum/anchor"));
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const setup_1 = require("./helper/setup");
const constants_1 = require("./constants");
const airdrop_1 = require("./helper/airdrop");
const provider = anchor_1.AnchorProvider.env();
anchor.setProvider(provider);
describe('maius-event-manage', () => __awaiter(void 0, void 0, void 0, function* () {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.MaiusEventManage;
    const airdropSolAmount = 3;
    let host = anchor.web3.Keypair.generate();
    let executor = anchor.web3.Keypair.generate();
    let event, vault;
    before('Boilerplates', () => __awaiter(void 0, void 0, void 0, function* () {
        // airdrop
        const delay = ms => new Promise(res => setTimeout(res, ms));
        yield delay(1000);
        yield (0, airdrop_1.airdrop)(provider, host.publicKey, airdropSolAmount);
    }));
    it('Init event!', () => __awaiter(void 0, void 0, void 0, function* () {
        event = yield (0, setup_1.findPDA)(host.publicKey, constants_1.EventSeed, program);
        vault = yield (0, setup_1.findPDA)(host.publicKey, constants_1.VaultSeed, program);
        yield program.methods
            .initEvent(executor.publicKey)
            .accounts({
            eventAccount: event,
            vault: vault,
            host: host.publicKey,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .signers([host])
            .rpc();
    }));
    const data = yield program.account.event.fetch(event);
    console.log('[event] Create result: ', data);
}));
