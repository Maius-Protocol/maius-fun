use anchor_lang::prelude::*;
use crate::constants::*;


#[account]
#[derive(Default)]
pub struct Event {
    pub host: Pubkey,
    pub vault: Pubkey,
    pub executor: Pubkey,
    pub number_of_nft: u64,
    pub amount: u64
}

impl Event {
    // FYI: https://github.com/coral-xyz/anchor/blob/master/lang/syn/src/codegen/program/handlers.rs#L98
    pub fn space() -> usize {
        8 +  // discriminator
        PUBKEY_SIZE + // host
        PUBKEY_SIZE + // vault
        PUBKEY_SIZE + // executor
        8 + // number_of_nft
        8  // amount
    }
}

