import { AnchorProvider } from '@project-serum/anchor'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

export async function airdrop(
  provider: AnchorProvider,
  pubkey: PublicKey,
  amount: number,
) {
  const signature = await provider.connection.requestAirdrop(
    pubkey,
    amount * LAMPORTS_PER_SOL,
  )
  await provider.connection.confirmTransaction(signature, 'confirmed')
  const delay = ms => new Promise(res => setTimeout(res, ms))
  await delay(1000 * 5)
  const balance = await provider.connection.getBalance(pubkey)
  console.log(
    `airdropped ${amount} to address ${pubkey.toBase58()} current balance ${balance}`,
  )
}
