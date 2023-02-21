import { NETWORK } from '@/Config/solana'
import { Connection, PublicKey } from '@solana/web3.js'

export const IDL = require('../types/idl.json')
export const programID = new PublicKey(IDL.metadata.address)
export const connection = new Connection(NETWORK, 'confirmed')
