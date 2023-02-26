import { MaiusEventManage } from '@/types/maius_event_manage'
import { Program } from '@project-serum/anchor'

export type EventType = Awaited<
  ReturnType<Program<MaiusEventManage>['account']['event']['fetch']>
> & {
  eventAccountAddress?: string
  vault?: any
}
