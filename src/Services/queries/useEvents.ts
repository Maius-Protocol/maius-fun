import { useQuery } from 'react-query'
import { Event, LazyEvent } from '@/models'

function useEvents() {
  return useQuery<LazyEvent[]>(['events'], async () => {
    return []
    // const events = await DataStore.query(Event, Predicates.ALL, {
    //   sort: e =>
    //     e.status(SortDirection.DESCENDING).createdAt(SortDirection.DESCENDING),
    // })
    // return events
  })
}

export default useEvents
