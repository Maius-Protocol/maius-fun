use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use crate::error::*;

use instructions::*;

declare_id!("3vBYZPmCC55YWUcz994AMDqh6hakWnEFxd9vnFPgdyVi");

#[program]
pub mod maius_event_manage {
    use super::*;

    pub fn create_identifier(ctx: Context<CreateIdentifier>) -> Result<()> {
        create_identifier::handler(ctx)
    }

    pub fn init_event(ctx: Context<InitEvent>, executor: Pubkey) -> Result<()> {
        init_event::handler(ctx, executor)
    }

    pub fn set_event(ctx: Context<SetEvent>, number_of_nft: u64) -> Result<()> {
        set_event::handler(ctx, number_of_nft)
    }

    pub fn transfer_fee(ctx: Context<TransferFee>) -> Result<()> {
        transfer_fee::handler(ctx)
    }

    pub fn close_event(ctx: Context<CloseEvent>) -> Result<()> {
        close_event::handler(ctx)
    }

    pub fn claim_vault(ctx: Context<ClaimVault>) -> Result<()> {
        claim_vault::handler(ctx)
    }

    pub fn update_event(
        ctx: Context<UpdateEvent>,
        nft_more: Option<u64>,
        collection: Option<Pubkey>,
    ) -> Result<()> {
        update_event::handler(ctx, nft_more, collection)
    }
}
