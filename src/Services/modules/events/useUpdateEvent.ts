import { useProgram } from '@/Hooks/useProgram'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { useMutation } from 'react-query'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

interface useUpdateEventProps {
  name: string
  nft_more: number
  collection: string
  frameUrl: string
  description: string
  opened: boolean
}

function useUpdateEvent(
  eventAccountAddress: string,
  vaultAccountAddress: string,
) {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useMutation(
    async ({
      opened,
      name,
      frameUrl,
      nft_more,
      collection,
      description,
    }: Partial<useUpdateEventProps>) => {
      try {
        const update = await program.methods
          .updateEvent(
            nft_more ? new BN(nft_more) : new BN(0),
            collection ? new PublicKey(collection) : null,
            typeof opened !== 'undefined' ? opened : null,
            name ? name : null,
            frameUrl ? frameUrl : null,
            description ? description : null,
          )
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
      } catch (e) {
        console.log(e)
      }
    },
  )
}

export default useUpdateEvent
