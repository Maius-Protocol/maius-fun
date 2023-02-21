use anchor_lang::prelude::*;

use crate::state::{Identifier};
use crate::constants::*;

#[derive(Accounts)]
pub struct CreateIdentifier<'info> {
    #[account(
        init_if_needed,
        seeds = [b"v1", IDENTIFIER_SEED.as_ref(), host.key().as_ref()],
        bump,
        space = Identifier::space(),
        payer = host
    )]
    pub identifier: Account<'info, Identifier>,

    #[account(mut)]
    pub host : Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateIdentifier>
) -> Result<()> {
    let identifier = &mut ctx.accounts.identifier;
    identifier.host = ctx.accounts.host.key();
    identifier.count = 0;

    Ok(())
}