// import {
//   Keypair,
//   Connection,
//   PublicKey,
//   Transaction,
//   SystemProgram,
//   sendAndConfirmTransaction,
//   LAMPORTS_PER_SOL,
// } from '@solana/web3.js'
//
// import {
//   createApproveInstruction,
//   createAssociatedTokenAccountInstruction,
//   createInitializeMintInstruction,
//   createMintToCheckedInstruction,
//   getAssociatedTokenAddress,
//   getMinimumBalanceForRentExemptMint,
//   getOrCreateAssociatedTokenAccount,
//   MINT_SIZE,
//   TOKEN_PROGRAM_ID,
// } from '@solana/spl-token'
//
// import {
//   PROGRAM_ID as MPL_TOKEN_METADATA_PROGRAM_ID,
//   createCreateMetadataAccountV2Instruction,
//   createCreateMasterEditionV3Instruction,
//   createFreezeDelegatedAccountInstruction,
//   PROGRAM_ID,
// } from '@metaplex-foundation/mpl-token-metadata'
// import { useMutation } from 'react-query'
//
// export async function getMetadataPDA(mint: PublicKey): Promise<PublicKey> {
//   const [publicKey] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from('metadata'),
//       MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//       mint.toBuffer(),
//     ],
//     MPL_TOKEN_METADATA_PROGRAM_ID,
//   )
//   return publicKey
// }
//
// export async function getMasterEditionPDA(mint: PublicKey): Promise<PublicKey> {
//   const [publicKey] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from('metadata'),
//       MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//       mint.toBuffer(),
//       Buffer.from('edition'),
//     ],
//     MPL_TOKEN_METADATA_PROGRAM_ID,
//   )
//   return publicKey
// }
//
// function useMintInstruction() {
//   return useMutation(async () => {
//     let mint = Keypair.generate()
//     console.log(`mint: ${mint.publicKey.toBase58()}`)
//     let mint1 = Keypair.generate()
//     console.log(`mint: ${mint.publicKey.toBase58()}`)
//
//     let ata = await getAssociatedTokenAddress(mint.publicKey, mint1.publicKey)
//
//     let tokenMetadataPubkey = await getMetadataPDA(mint.publicKey)
//
//     let masterEditionPubkey = await getMasterEditionPDA(mint.publicKey)
//     // let tx = new Transaction().add(
//     //   SystemProgram.transfer({
//     //     fromPubkey: applicantWallet.publicKey,
//     //     toPubkey: mint1.publicKey,
//     //     lamports: 0.02 * LAMPORTS_PER_SOL,
//     //   }),
//     // )
//   })
// }
//
// export default useMintInstruction
