import { EventType } from '@/types/schema'

export const serializeEvent = (
  event: EventType,
  eventAccountAddress: string,
) => ({
  name: event.name,
  opened: event.opened,
  host: event.host.toBase58(),
  vault: event.vault.toBase58(),
  executor: event.executor.toBase58(),
  number_of_nft: event.numberOfNft.toNumber(),
  amount: event.amount.toNumber(),
  index: event.index.toNumber(),
  collection: event.collection?.toBase58(),
  frameUrl: event.frameUrl,
  eventAccountAddress,
})
