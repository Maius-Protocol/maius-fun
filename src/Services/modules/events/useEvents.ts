import { useProgram } from '@/Hooks/useProgram'
import { useQuery } from 'react-query'

function useEvents() {
  const { program } = useProgram()
  return useQuery(['events'], async () => {
    try {
      return await program.account.event.all()
    } catch (e) {
      console.log(e)
    }
  })
}

export default useEvents
