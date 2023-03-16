use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction;

use crate::constants::*;
use crate::state::Event;
use crate::ErrorCodes;

#[derive(Accounts)]
pub struct UpdateEvent<'info> {
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
    ctx: Context<UpdateEvent>,
    nft_more: Option<u64>,
    collection: Option<Pubkey>,
    opened: Option<bool>,
    name: Option<String>,
    frame_url: Option<String>,
    description: Option<String>
) -> Result<()> {
    let event = &mut ctx.accounts.event;
    if nft_more != None {
        event.number_of_nft += nft_more.unwrap();
        let amount = nft_more.unwrap() * FEE;
        event.amount += amount;

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
    }
    if collection != None {
        event.collection = collection
    }
    if opened != None {
        event.opened = opened.unwrap();
    }
    if name != None {
        event.name = name.unwrap();
    }
    if frame_url != None {
        event.frame_url = frame_url.unwrap();
    }
    if description != None {
        event.description = description.unwrap();
    }

    Ok(())
}
