import { useMutation } from 'react-query'
import { PublicKey, Transaction } from '@solana/web3.js'
import { connection } from '@/Config/program'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { useWallet } from '@/Hooks/useWallet'

function useSendTransaction() {
  const wallet = useSelector(walletPublicKey)
  const { signAndSendTransaction } = useWallet()
  return useMutation(async (transactions: Transaction[]) => {
    let transaction = new Transaction()
    transaction.add(...transactions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash('confirmed')
    ).blockhash
    transaction.feePayer = new PublicKey(wallet!)
    const serialized = transaction.serialize({
      requireAllSignatures: false,
    })
    await signAndSendTransaction(serialized)
  })
}

export default useSendTransaction
