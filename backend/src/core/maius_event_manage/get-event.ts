import { GetMaiusEventManageProgram } from '../program'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

const maiusInvestProgram = GetMaiusEventManageProgram()

export type EventAccount = {
  host: PublicKey
  opened: boolean
  vault: PublicKey
  executor: PublicKey
  numberOfNft: BN
  name: String
  frame_url: String
  description: String
}

export const getEvent = async (event: string): Promise<EventAccount> => {
  try {
    let data = await maiusInvestProgram.account.event.fetch(
      new PublicKey(event),
      'confirmed',
    )
    let eventData: EventAccount = {
      host: data.host,
      opened: data.opened,
      vault: data.vault,
      executor: data.executor,
      numberOfNft: data.numberOfNft,
      name: data.name,
      frame_url: data.frameUrl,
      description: data.description,
    }
    return eventData
  } catch (e) {
    throw Error(e?.toString())
  }
}
