use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCodes {

    #[msg("Not enough lamport")]
    NotEnoughLamport,

    #[msg("Invalid account")]
    InvalidAccount,

}