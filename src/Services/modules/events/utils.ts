import { PublicKey } from '@solana/web3.js'

export const EventSeed = 'event'
export const VaultSeed = 'vault'

export function findEventAddress(host: PublicKey, program: any) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('v1'), Buffer.from(EventSeed), host.toBuffer()],
    program.programId,
  )
}

export function findVaultAddress(host: PublicKey, program: any) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('v1'), Buffer.from(VaultSeed), host.toBuffer()],
    program.programId,
  )
}
