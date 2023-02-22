import { useMutation } from 'react-query'
import { useProgram } from '@/Hooks/useProgram'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'

interface useTopUpProps {
  eventAccountAddress: string
  vaultAccountAddress: string
}

function useTopUp({ eventAccountAddress, vaultAccountAddress }: useTopUpProps) {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useMutation(async (numberOfNfts: number) => {
    return await program.methods
      .setEvent(numberOfNfts)
      .accounts({
        event: new PublicKey(eventAccountAddress),
        vault: new PublicKey(vaultAccountAddress),
        host: new PublicKey(wallet!),
        systemProgram: SystemProgram.programId,
      })
      .rpc()
  })
}

export default useTopUp
