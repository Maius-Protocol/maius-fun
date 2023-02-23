import { MaiusEventManage } from '@/types/maius_event_manage'
import { Program } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

export type Event = Awaited<
  ReturnType<Program<MaiusEventManage>['account']['event']['fetch']>
> & {
  eventAccountAddress?: string
  vault?: any
}
