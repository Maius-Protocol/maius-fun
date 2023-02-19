use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;
pub mod constants;
pub mod error;

use crate::error::*;

use instructions::*;

declare_id!("3vBYZPmCC55YWUcz994AMDqh6hakWnEFxd9vnFPgdyVi");

#[program]
pub mod maius_event_manage {
    use super::*;

    pub fn init_event(ctx: Context<InitEvent>, executor: Pubkey) -> Result<()> {
        init_event::handler(ctx, executor)
    }

    pub fn set_event(ctx: Context<SetEvent>, number_of_nft: u64) -> Result<()> {
        set_event::handler(ctx, number_of_nft)
    }

    pub fn transfer_fee(ctx: Context<TransferFee>) -> Result<()> {
        transfer_fee::handler(ctx)
    }

}

