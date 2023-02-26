import { GetMaiusEventManageProgram } from '../program'
import { PublicKey, SystemProgram } from '@solana/web3.js'

const maiusEventMangeProgram = GetMaiusEventManageProgram()

export const TransferFee = async (
  executor: PublicKey,
  eventAccount: PublicKey,
  vaultAccount: PublicKey,
) => {
  const transaction = await maiusEventMangeProgram.methods
    .transferFee()
    .accounts({
      event: eventAccount,
      vault: vaultAccount,
      executor: executor,
      systemProgram: SystemProgram.programId,
    })
    .transaction()

  return transaction
}
