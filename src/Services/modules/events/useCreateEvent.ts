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
import { findIdentifierAddress } from '@/Services/modules/identifier/utils'

interface useCreateEventProps {
  opened: boolean
  name: string
  frame_url: string
  count: number
}

function useCreateEvent() {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)
  return useMutation(
    async ({ count = 0, opened, name, frame_url }: useCreateEventProps) => {
      const [eventAccountAddress, eventBump] = findEventAddress(
        new PublicKey(wallet!),
        count,
        program,
      )
      const [vaultAccountAddress, vaultBump] = findVaultAddress(
        new PublicKey(wallet!),
        count,
        program,
      )

      const [identifierAccountAddress, identBump] = findIdentifierAddress(
        new PublicKey(wallet!),
        program,
      )

      const initEvent = await program.methods
        .initEvent(new PublicKey(MaiusPublicKey), opened, name, frame_url)
        .accounts({
          event: eventAccountAddress,
          vault: vaultAccountAddress,
          identifier: identifierAccountAddress,
          host: new PublicKey(wallet!),
          systemProgram: SystemProgram.programId,
        })

      return {
        address: eventAccountAddress,
        transaction: await initEvent.transaction(),
      }
    },
  )
}

export default useCreateEvent
