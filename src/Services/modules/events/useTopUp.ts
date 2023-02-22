import { useMutation } from 'react-query'
import { useProgram } from '@/Hooks/useProgram'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { BN } from '@project-serum/anchor'

interface useTopUpProps {
  eventAccountAddress: string
  vaultAccountAddress: string
}

function useTopUp({ eventAccountAddress, vaultAccountAddress }: useTopUpProps) {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useMutation(async (numberOfNfts: number) => {
    try {
      return await program.methods
        .setEvent(new BN(numberOfNfts))
        .accounts({
          event: new PublicKey(eventAccountAddress),
          vault: new PublicKey(vaultAccountAddress),
          host: new PublicKey(wallet!),
          systemProgram: SystemProgram.programId,
        })
        .transaction()
    } catch (e) {
      console.log(e)
    }
  })
}

export default useTopUp
