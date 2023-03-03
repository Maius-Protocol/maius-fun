import { useProgram } from '@/Hooks/useProgram'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { useMutation } from 'react-query'
import { PublicKey, SystemProgram } from '@solana/web3.js'

function useCloseEvent(
  eventAccountAddress: string,
  vaultAccountAddress: string,
) {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useMutation(async () => {
    const close = await program.methods.closeEvent().accounts({
      event: new PublicKey(eventAccountAddress),
      vault: new PublicKey(vaultAccountAddress),
      host: new PublicKey(wallet!),
      systemProgram: SystemProgram.programId,
    })
    return {
      address: eventAccountAddress,
      transaction: await close.transaction(),
    }
  })
}

export default useCloseEvent
