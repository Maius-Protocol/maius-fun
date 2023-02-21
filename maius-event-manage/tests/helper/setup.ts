import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

export async function findIdentifierPDA(
  host: PublicKey,
  seed: String,
  program: any
) {
  return await PublicKey.findProgramAddress(
    [Buffer.from('v1'), Buffer.from(seed), host.toBuffer()],
    program.programId,
  )
}

export async function findPDA(
  host: PublicKey,
  seed: String,
  identifierCount: BN,
  program: any,
) {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from('v1'),
      Buffer.from(seed),
      identifierCount.toArrayLike(Buffer, 'le', 8),
      host.toBuffer(),
    ],
    program.programId,
  )
}
