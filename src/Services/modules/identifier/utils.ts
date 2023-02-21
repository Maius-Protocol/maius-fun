import { PublicKey } from '@solana/web3.js'

export const IdentifierSeed = 'identifier'

export function findIdentifierAddress(host: PublicKey, program: any) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('v1'), Buffer.from(IdentifierSeed), host.toBuffer()],
    program.programId,
  )
}
