import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

export const EventSeed = 'event'
export const VaultSeed = 'vault'

export function findEventAddress(host: PublicKey, count: number, program: any) {
  console.log(
    Buffer.from('v1'),
    Buffer.from(EventSeed),
    new BN(count).toArrayLike(Buffer, 'le', 8),
    host.toBuffer(),
  )
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('v1'),
      Buffer.from(EventSeed),
      new BN(count).toArrayLike(Buffer, 'le', 8),
      host.toBuffer(),
    ],
    program.programId,
  )
}

export function findVaultAddress(host: PublicKey, count: number, program: any) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('v1'),
      Buffer.from(VaultSeed),
      new BN(count).toArrayLike(Buffer, 'le', 8),
      host.toBuffer(),
    ],
    program.programId,
  )
}
