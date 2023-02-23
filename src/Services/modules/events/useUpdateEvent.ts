import { useProgram } from '@/Hooks/useProgram'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { useMutation } from 'react-query'
import { PublicKey, SystemProgram } from '@solana/web3.js'

interface useUpdateEventProps {
  name: string
  frameUrl: string
  opened: boolean
}

function useUpdateEvent(
  eventAccountAddress: string,
  vaultAccountAddress: string,
) {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useMutation(
    async ({ opened, name, frameUrl }: useUpdateEventProps) => {
      const update = await program.methods
        .updateEvent(null, null, opened, name, frameUrl)
        .accounts({
          event: new PublicKey(eventAccountAddress),
          vault: new PublicKey(vaultAccountAddress),
          host: new PublicKey(wallet!),
          systemProgram: SystemProgram.programId,
        })
      return {
        address: eventAccountAddress,
        transaction: await update.transaction(),
      }
    },
  )
}

export default useUpdateEvent
