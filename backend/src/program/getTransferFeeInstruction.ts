import { PublicKey, SystemProgram } from '@solana/web3.js'
import { MaiusFunProgram } from '@/program/program'

export const getTransferFeeInstructions = async (
  executor: PublicKey,
  eventAccount: PublicKey,
  vaultAccount: PublicKey,
) => {
  return await MaiusFunProgram.methods
    .transferFee()
    .accounts({
      event: eventAccount,
      vault: vaultAccount,
      executor: executor,
      systemProgram: SystemProgram.programId,
    })
    .transaction()
}
