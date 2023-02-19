import { PublicKey } from '@solana/web3.js'

export async function findPDA(host: PublicKey, seed: String, program: any) {
  return await PublicKey.findProgramAddress(
    [Buffer.from('v1'), Buffer.from(seed), host.toBuffer()],
    program.programId,
  )
}
