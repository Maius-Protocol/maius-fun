import { useProgram } from '@/Hooks/useProgram'
import { useQuery } from 'react-query'

function useEvents() {
  const { program } = useProgram()
  return useQuery(['events'], async () => {
    return await program.account.event.all()
  })
}

export default useEvents
