import { PublicKey } from '@solana/web3.js'

export async function getLamportBalance(
  program,
  pubkey: PublicKey,
  name: string,
) {
  let balance = await program.provider.connection.getBalance(pubkey)
  console.log(
    `current balance of ${name} has address ${pubkey.toBase58()} is ${balance}`,
  )
}
