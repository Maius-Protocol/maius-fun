import * as anchor from '@project-serum/anchor'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { MaiusEventManage } from '../target/types/maius_event_manage'
import { PublicKey, SystemProgram } from '@solana/web3.js'
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

  const airdropSolAmount = 2

  let host = anchor.web3.Keypair.generate()
  let executor = anchor.web3.Keypair.generate()
  let eventAccount, vaultAccount, identifierAccount: anchor.web3.PublicKey
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventBump, vaultBump, identifierBump: number
  const delay = ms => new Promise(res => setTimeout(res, ms))

  before('Boilerplates', async () => {
    // airdrop
    await delay(1000 * 2)
    await airdrop(provider, host.publicKey, airdropSolAmount)
  })
  it('Init event!', async () => {
    [identifierAccount, identifierBump] = await PublicKey.findProgramAddress(
      [Buffer.from('v1'), Buffer.from('identifier'), host.publicKey.toBuffer()],
      program.programId,
    )
    await program.methods
      .createIdentifier()
      .accounts({
        identifier: identifierAccount,
        host: host.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([host])
      .rpc()
    const identifier = await program.account.identifier.fetch(identifierAccount)
    console.log('[identifier] Create result: ', identifier)
    ;[eventAccount, eventBump] = await PublicKey.findProgramAddress(
      [
        Buffer.from('v1'),
        Buffer.from('event'),
        identifier.count.toArrayLike(Buffer, 'le', 8),
        host.publicKey.toBuffer(),
      ],
      program.programId,
    )
    ;[vaultAccount, vaultBump] = await PublicKey.findProgramAddress(
      [
        Buffer.from('v1'),
        Buffer.from('vault'),
        identifier.count.toArrayLike(Buffer, 'le', 8),
        host.publicKey.toBuffer(),
      ],
      program.programId,
    )
    await program.methods
      .initEvent(executor.publicKey)
      .accounts({
        event: eventAccount,
        vault: vaultAccount,
        identifier: identifierAccount,
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

  it('claim vault!', async () => {
    await getLamportBalance(program, host.publicKey, 'host before claim vault')
    await getLamportBalance(program, vaultAccount, 'vault before')
    await program.methods
      .claimVault()
      .accounts({
        event: eventAccount,
        vault: vaultAccount,
        host: host.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([host])
      .rpc()

    await getLamportBalance(program, vaultAccount, 'vault after')
  })

  it('update event', async () => {
    await program.methods
      .updateEvent(
        new BN(3),
        new PublicKey('4mKSoDDqApmF1DqXvVTSL6tu2zixrSSNjqMxUnwvVzy2'),
      )
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
    await getLamportBalance(program, vaultAccount, 'vault after')
  })

  it('get all event', async () => {
    const data = await program.account.event.all()
    console.log('[event] Create result: ', data)
  })

  it('filter event by host', async () => {
    const data = await program.account.event.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: host.publicKey.toBase58(),
        },
      },
    ])
    console.log('[event] Create result: ', data)
  })

  // it('close event!', async () => {
  //   await getLamportBalance(program, executor.publicKey, 'executor before')
  //   await getLamportBalance(program, vaultAccount, 'vault before')
  //   await program.methods
  //     .closeEvent()
  //     .accounts({
  //       event: eventAccount,
  //       vault: vaultAccount,
  //       host: host.publicKey,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([host])
  //     .rpc()
  //   await getLamportBalance(program, vaultAccount, 'vault after')
  //   await getLamportBalance(program, executor.publicKey, 'executor after')
  // })
})
