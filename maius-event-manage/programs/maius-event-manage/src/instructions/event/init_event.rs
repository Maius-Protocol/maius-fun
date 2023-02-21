use anchor_lang::prelude::*;

use crate::constants::*;
use crate::state::{Event, Identifier};

#[derive(Accounts)]
pub struct InitEvent<'info> {
    #[account(
        init_if_needed,
        seeds = [
            b"v1",
            EVENT_SEED.as_ref(),
            identifier.count.to_le_bytes().as_ref(),
            host.key().as_ref()
        ],
        bump,
        payer = host,
        space = Event::space()
    )]
    pub event: Account<'info, Event>,

    /// CHECK
    #[account(
        mut,
        seeds = [
            b"v1",
            VAULT_SEED.as_ref(),
            identifier.count.to_le_bytes().as_ref(),
            host.key().as_ref()
        ],
        bump,
    )]
    pub vault: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [b"v1", IDENTIFIER_SEED.as_ref(), host.key().as_ref()],
        bump,
        has_one = host
    )]
    pub identifier: Account<'info, Identifier>,

    #[account(mut)]
    pub host: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitEvent>, executor: Pubkey) -> Result<()> {
    let event = &mut ctx.accounts.event;
    let identifier = &mut ctx.accounts.identifier;

    event.host = ctx.accounts.host.key();
    event.vault = ctx.accounts.vault.key();
    event.executor = executor;
    event.amount = 0;
    event.number_of_nft = 0;
    event.collection = None;
    event.index = identifier.count;
    identifier.count += 1;

    Ok(())
}
