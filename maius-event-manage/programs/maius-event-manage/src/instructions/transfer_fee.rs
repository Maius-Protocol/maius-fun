use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;

use crate::state::Event;
use crate::constants::*;
use crate::ErrorCodes;

#[derive(Accounts)]
pub struct TransferFee<'info> {
    #[account(
        mut,
        seeds = [
        b"v1",
        EVENT_SEED.as_ref(),
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
        event.host.key().as_ref(),
        ],
        bump,
        constraint = *vault.key == event.vault
        @ ErrorCodes::InvalidAccount
    )]
    pub vault: AccountInfo<'info>,

    #[account(
        mut,
        constraint = *executor.key == event.executor
        @ ErrorCodes::InvalidAccount
    )]
    pub executor: Signer<'info>,

    pub system_program: Program<'info, System>,

}

pub fn handler(
    ctx: Context<TransferFee>,
) -> Result<()> {
    let event = &mut ctx.accounts.event;

    let balance: u64 = ctx.accounts.vault.to_account_info().lamports();

    require!(
        balance >= FEE,
        ErrorCodes::NotEnoughLamport
    );

    event.amount -= FEE;
    event.number_of_nft -= 1;

    let ix = system_instruction::transfer(
        &ctx.accounts.vault.key(),
        &ctx.accounts.executor.key(),
        FEE,
    );
    invoke_signed(
        &ix,
        &[
            ctx.accounts.vault.to_account_info(),
            ctx.accounts.executor.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[&[b"v1", VAULT_SEED, event.host.key().as_ref(), &[*ctx.bumps.get("vault").unwrap()]]],
    )?;
    Ok(())
}