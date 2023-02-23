use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;

use crate::constants::*;
use crate::state::Event;
use crate::ErrorCodes;

#[derive(Accounts)]
pub struct ClaimVault<'info> {
    #[account(
        mut,
        seeds = [
        b"v1",
        EVENT_SEED.as_ref(),
        event.index.to_le_bytes().as_ref(),
        event.host.key().as_ref(),
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
        event.host.key().as_ref(),
        ],
        bump,
        constraint = *vault.key == event.vault
        @ ErrorCodes::InvalidAccount
    )]
    pub vault: AccountInfo<'info>,

    #[account(
        mut,
        constraint = *host.key == event.host
        @ ErrorCodes::InvalidAccount
        )]
    pub host: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ClaimVault>) -> Result<()> {
    let event = &mut ctx.accounts.event;

    event.amount = 0;
    event.number_of_nft = 0;
    event.opened = false;

    let balance: u64 = ctx.accounts.vault.to_account_info().lamports();
    let ix =
        system_instruction::transfer(&ctx.accounts.vault.key(), &ctx.accounts.host.key(), balance);
    invoke_signed(
        &ix,
        &[
            ctx.accounts.vault.to_account_info(),
            ctx.accounts.host.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[&[
            b"v1",
            VAULT_SEED,
            event.index.to_le_bytes().as_ref(),
            event.host.key().as_ref(),
            &[*ctx.bumps.get("vault").unwrap()],
        ]],
    )?;
    Ok(())
}
