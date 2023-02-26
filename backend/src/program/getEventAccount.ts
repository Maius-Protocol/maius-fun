import { PublicKey } from '@solana/web3.js'
import { MaiusFunProgram } from '@/program/program'
import { EventType } from '../../../src/types/schema'
import { cache } from '@/core/cache'

const eventKeyCache = (address: String) => `event_${address}`

export const getEventAccount = async (
  address: string,
): Promise<EventType | undefined> => {
  try {
    const _eventData = (await cache.get(eventKeyCache(address))) as EventType
    if (_eventData) {
      return _eventData
    }
  } catch (e) {
    try {
      let data = await MaiusFunProgram.account.event.fetch(
        new PublicKey(address),
        'confirmed',
      )
      await cache.set(eventKeyCache(address), data)
      return data
    } catch (e) {
      throw Error(e?.toString())
    }
  }
}
