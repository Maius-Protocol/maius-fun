import * as anchor from '@project-serum/anchor'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { MaiusEventManage } from '../target/types/maius_event_manage'
import { SystemProgram } from '@solana/web3.js'
import { findPDA } from './helper/setup'
import { EventSeed, VaultSeed } from './constants'
import { airdrop } from './helper/airdrop'
import BN from 'bn.js'
import { getLamportBalance } from './helper/helper'

const provider = AnchorProvider.env()
anchor.setProvider(provider)

describe('maius-event-manage', async () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.MaiusEventManage as Program<MaiusEventManage>

  const airdropSolAmount = 3

  let host = anchor.web3.Keypair.generate()
  let executor = anchor.web3.Keypair.generate()
  let eventAccount, vaultAccount: anchor.web3.PublicKey
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventBump, vaultBump: number
  const delay = ms => new Promise(res => setTimeout(res, ms))

  before('Boilerplates', async () => {
    // airdrop

    await delay(1000)

    await airdrop(provider, host.publicKey, airdropSolAmount)
  })
  it('Init event!', async () => {
    [eventAccount, eventBump] = await findPDA(
      host.publicKey,
      EventSeed,
      program,
    )
    ;[vaultAccount, vaultBump] = await findPDA(
      host.publicKey,
      VaultSeed,
      program,
    )
    await program.methods
      .initEvent(executor.publicKey)
      .accounts({
        event: eventAccount,
        vault: vaultAccount,
        host: host.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([host])
      .rpc()
    const data = await program.account.event.fetch(eventAccount)
    console.log('[event] Create result: ', data)
  })
  it('Set event!', async () => {
    await program.methods
      .setEvent(new BN(10))
      .accounts({
        event: eventAccount,
        vault: vaultAccount,
        host: host.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([host])
      .rpc()
    const data = await program.account.event.fetch(eventAccount)
    console.log('[event] Create result: ', data)
    await getLamportBalance(program, vaultAccount, 'vault')
  })

  it('Transfer fee!', async () => {
    await getLamportBalance(program, executor.publicKey, 'executor before')
    await program.methods
      .transferFee()
      .accounts({
        event: eventAccount,
        vault: vaultAccount,
        executor: executor.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([executor])
      .rpc()
    const data = await program.account.event.fetch(eventAccount)
    console.log('[event] Create result: ', data)
    await getLamportBalance(program, executor.publicKey, 'executor after')
  })
})