import { useMutation } from 'react-query'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useProgram } from '@/Hooks/useProgram'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { findIdentifierAddress } from '@/Services/modules/identifier/utils'

function useCreateIdentifier() {
  const wallet = useSelector(walletPublicKey)
  const { program } = useProgram()
  return useMutation(async () => {
    const [identifierAccount, _] = findIdentifierAddress(
      new PublicKey(wallet!),
      program,
    )
    const initIdentifier = await program.methods.createIdentifier().accounts({
      identifier: new PublicKey(identifierAccount),
      host: new PublicKey(wallet!),
      systemProgram: SystemProgram.programId,
    })

    return await initIdentifier.transaction()
  })
}

export default useCreateIdentifier
