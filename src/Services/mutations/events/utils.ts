import { PublicKey } from '@solana/web3.js'

export const EventSeed = 'event'
export const VaultSeed = 'vault'

export function findEventAddress(host: PublicKey, seed: String, program: any) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('v1'), Buffer.from(seed), host.toBuffer()],
    program.programId,
  )
}
