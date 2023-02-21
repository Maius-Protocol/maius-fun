import { MaiusEventManage } from '@/types/maius_event_manage'
import { Program } from '@project-serum/anchor'

export type Event = Awaited<
  ReturnType<Program<MaiusEventManage>['account']['event']['fetch']>
>
