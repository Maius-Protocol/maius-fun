import { useQuery } from 'react-query'
import { useProgram } from '@/Hooks/useProgram'
import { PublicKey } from '@solana/web3.js'
import { findIdentifierAddress } from '@/Services/modules/identifier/utils'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'

function useIdentifier() {
  const wallet = useSelector(walletPublicKey)
  const { program } = useProgram()
  return useQuery(
    ['identifier'],
    async () => {
      const [identifierAccount, _] = findIdentifierAddress(
        new PublicKey(wallet!),
        program,
      )
      return await program.account.identifier.fetch(identifierAccount)
    },
    { retry: 1 },
  )
}

export default useIdentifier
