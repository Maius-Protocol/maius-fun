use anchor_lang::prelude::*;

pub const PUBKEY_SIZE: usize = std::mem::size_of::<Pubkey>();
pub const BOOL_SIZE: usize = std::mem::size_of::<bool>();
pub const I64_SIZE: usize = std::mem::size_of::<i64>();
pub const U64_SIZE: usize = std::mem::size_of::<u64>();
pub const VERSION: i8 = 1;
pub const EVENT_SEED: &[u8] = b"event";
pub const VAULT_SEED: &[u8] = b"vault";
pub const IDENTIFIER_SEED: &[u8] = b"identifier";
pub const FEE: u64 = 20000000;