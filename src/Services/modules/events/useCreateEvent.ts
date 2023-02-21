import { useMutation } from 'react-query'
import { useProgram } from '@/Hooks/useProgram'
import {
  findEventAddress,
  findVaultAddress,
} from '@/Services/modules/events/utils'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import MaiusPublicKey from '../../../../keypair/keypair'

interface useCreateEventProps {
  opened: boolean
  name: string
  frame_url: string
}

function useCreateEvent() {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)
  return useMutation<unknown, unknown, useCreateEventProps, unknown>(
    async ({ opened, name, frame_url }) => {
      const [eventAccountAddress, eventBump] = findEventAddress(
        new PublicKey(wallet!),
        program,
      )
      const [vaultAccountAddress, vaultBump] = findVaultAddress(
        new PublicKey(wallet!),
        program,
      )

      const initEvent = await program.methods
        .initEvent(new PublicKey(MaiusPublicKey), opened, name, frame_url)
        .accounts({
          event: eventAccountAddress,
          vault: vaultAccountAddress,
          host: new PublicKey(wallet!),
          systemProgram: SystemProgram.programId,
        })

      return await initEvent.transaction()
    },
  )
}

export default useCreateEvent
