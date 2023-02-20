import { useMutation } from 'react-query'
import { useProgram } from '@/Hooks/useProgram'
import {
  EventSeed,
  findEventAddress,
  VaultSeed,
} from '@/Services/mutations/events/utils'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import MaiusPublicKey from '@/../keypair/keypair'

function useCreateEvent() {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)
  return useMutation(async (params: any) => {
    const [eventAccountAddress, eventBump] = findEventAddress(
      new PublicKey(wallet!),
      EventSeed,
      program,
    )
    const [vaultAccountAddress, vaultBump] = findEventAddress(
      new PublicKey(wallet!),
      VaultSeed,
      program,
    )

    const initEvent = await program.methods
      .initEvent(new PublicKey(MaiusPublicKey))
      .accounts({
        event: eventAccountAddress,
        vault: vaultAccountAddress,
        host: new PublicKey(wallet!),
        systemProgram: SystemProgram.programId,
      })

    return await initEvent.transaction()
  })
}

export default useCreateEvent
