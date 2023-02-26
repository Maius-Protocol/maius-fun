import { PublicKey } from '@solana/web3.js'
import { MaiusFunProgram } from '@/program/program'
import { cache } from '@/core/cache'
import { EventType } from '@/types/schema'

const eventKeyCache = (address: String) => `event_${address}`

export const getEventAccount = async (
  address: string,
): Promise<EventType | undefined> => {
  try {
    const _eventData = (await cache.get(eventKeyCache(address))) as EventType
    console.log('Hit cache', _eventData)
    if (_eventData) {
      return _eventData
    } else {
      console.log('Cache miss: ', address)
      throw Error('Cache miss')
    }
  } catch (e) {
    try {
      let data = await MaiusFunProgram.account.event.fetch(
        new PublicKey(address),
        'confirmed',
      )
      await cache.set(eventKeyCache(address), {
        name: data?.name,
        host: data?.host?.toBase58(),
        opened: data?.opened,
        vault: data?.vault?.toBase58(),
        executor: data?.executor?.toBase58(),
        collection: data?.collection?.toBase58(),
        frameUrl: data?.frameUrl,
        description: data?.description,
        numberOfNft: data?.numberOfNft?.toNumber(),
        index: data?.index?.toNumber(),
      })
      return data
    } catch (e) {
      throw Error(e?.toString())
    }
  }
}
