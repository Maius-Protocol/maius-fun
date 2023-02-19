import { useQuery } from 'react-query'
import { DataStore, Predicates, SortDirection } from 'aws-amplify'
import { Event, LazyEvent } from '@/models'

function useEvents() {
  return useQuery<LazyEvent[]>(['events'], async () => {
    const events = await DataStore.query(Event, Predicates.ALL, {
      sort: e =>
        e.status(SortDirection.DESCENDING).createdAt(SortDirection.DESCENDING),
    })
    return events
  })
}

export default useEvents
