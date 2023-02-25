import { Program } from '@project-serum/anchor'

import {
  MaiusEventManage,
  IDL as MaiusEventManageIdl_v0_1_0,
} from './maius_event_investment/v.0.1.0'

import { PublicKey } from '@solana/web3.js'

export type MaiusEventManageProgram = Program<MaiusEventManage>

export const MAIUS_EVENT_MANAGE_PROGRAM_ADDRESS =
  '5ZfnmNHBaXSSpNkKa6Eb2dJ4h2psmQ3i8BLR3pJfYbgw'

export const MAIUS_EVENT_MANAGE_PROGRAM_ID = new PublicKey(
  MAIUS_EVENT_MANAGE_PROGRAM_ADDRESS,
)

export const PROGRAMS_IDLS = {
  [MAIUS_EVENT_MANAGE_PROGRAM_ADDRESS]: {
    '0.1.0': MaiusEventManageIdl_v0_1_0,
  },
}
