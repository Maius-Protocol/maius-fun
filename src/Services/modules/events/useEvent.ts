import { useProgram } from '@/Hooks/useProgram'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'

function useEvent(eventAccountAddress: string, options: any = {}) {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useQuery(
    [wallet, 'events', eventAccountAddress],
    async () => {
      try {
        return await program.account.event.fetch(eventAccountAddress)
      } catch (e) {
        console.log(e)
      }
    },
    {
      enabled: eventAccountAddress !== undefined,
      ...options,
    },
  )
}

export default useEvent
