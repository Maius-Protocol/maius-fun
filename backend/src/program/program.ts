import { AnchorProvider, Program, Wallet } from '@project-serum/anchor'
import { MaiusEventManage } from '../../../src/types/maius_event_manage'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { connection } from '@/core'
import { PublicKey } from '@solana/web3.js'

export const IDL = require('../../../src/types/idl.json')
export const programID = new PublicKey(IDL.metadata.address)

export const MaiusKeypair = Keypair.fromSecretKey(
  bs58.decode(process.env.MAIUS_WALLET_PRIVATE_KEY!),
)

export const MaiusWallet = new Wallet(MaiusKeypair)

const provider = new AnchorProvider(
  connection,
  MaiusWallet,
  AnchorProvider.defaultOptions(),
)

export const MaiusFunProgram: Program<MaiusEventManage> = new Program(
  IDL,
  programID,
  provider,
)
