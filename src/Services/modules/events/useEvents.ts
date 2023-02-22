import { useProgram } from '@/Hooks/useProgram'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'

function useEvents() {
  const { program } = useProgram()
  const wallet = useSelector(walletPublicKey)

  return useQuery([wallet, 'events'], async () => {
    try {
      return await program.account.event.all()
    } catch (e) {
      console.log(e)
    }
  })
}

export default useEvents
