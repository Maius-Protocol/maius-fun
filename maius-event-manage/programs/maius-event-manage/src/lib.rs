use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use crate::error::*;

use instructions::*;

declare_id!("En84b44YzBc3kY1iH8uEo5921nYYuJzUExM54KCx2sku");

#[program]
pub mod maius_event_manage {
    use super::*;

    pub fn create_identifier(ctx: Context<CreateIdentifier>) -> Result<()> {
        create_identifier::handler(ctx)
    }

    pub fn init_event(ctx: Context<InitEvent>, executor: Pubkey, opened: bool, name: String, frame_url: String, description: String) -> Result<()> {
        init_event::handler(ctx, executor, opened, name, frame_url, description)
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
        opened: Option<bool>,
        name: Option<String>,
        frame_url: Option<String>
    ) -> Result<()> {
        update_event::handler(ctx, nft_more, collection, opened, name, frame_url)
    }
}
