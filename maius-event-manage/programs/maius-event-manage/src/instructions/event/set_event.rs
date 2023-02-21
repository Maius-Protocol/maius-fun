use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction;

use crate::state::Event;
use crate::constants::*;
use crate::ErrorCodes;

#[derive(Accounts)]
pub struct SetEvent<'info> {
    #[account(
        mut,
        seeds = [
            b"v1",
            EVENT_SEED.as_ref(),
            event.index.to_le_bytes().as_ref(),
            host.key().as_ref()
        ],
        bump
    )]
    pub event: Account<'info, Event>,

    /// CHECK
    #[account(
        mut,
        seeds = [
        b"v1",
        VAULT_SEED.as_ref(),
        event.index.to_le_bytes().as_ref(),
        host.key().as_ref()
        ],
        bump,
        constraint = *vault.key == event.vault
        @ ErrorCodes::InvalidAccount
    )]
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    pub host: Signer<'info>,

    pub system_program: Program<'info, System>,

}

pub fn handler(
    ctx: Context<SetEvent>,
    number_of_nft: u64,
) -> Result<()> {
    let event = &mut ctx.accounts.event;
    event.number_of_nft = number_of_nft;
    let amount = number_of_nft*FEE;

    let balance: u64 = ctx.accounts.host.to_account_info().lamports();

    require!(
        amount <= balance,
        ErrorCodes::NotEnoughLamport
    );

    event.amount = amount;

    let ix = system_instruction::transfer(
        &ctx.accounts.host.key(),
        &ctx.accounts.vault.key(),
        amount,
    );
    invoke(
        &ix,
        &[
            ctx.accounts.host.to_account_info(),
            ctx.accounts.vault.to_account_info(),
        ],
    )?;
    Ok(())
}