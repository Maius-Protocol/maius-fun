import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/Store'

const slice = createSlice({
  name: 'wallet',
  initialState: {
    isSmsWallet: false,
    walletPublicKey: undefined,
    sharedSecret: undefined,
    dappKeypairSecret: undefined,
    session: undefined,
  } as WalletState,
  reducers: {
    updateWalletPublicKey: (
      state,
      { payload: { walletPublicKey, isSmsWallet = false } }: WalletPayload,
    ) => {
      state.walletPublicKey = walletPublicKey
      state.isSmsWallet = isSmsWallet
    },
    updateSharedSecret: (
      state,
      { payload: { sharedSecret } }: WalletPayload,
    ) => {
      state.sharedSecret = sharedSecret
    },
    updateKeypairSecret: (
      state,
      { payload: { dappKeypairSecret } }: WalletPayload,
    ) => {
      state.dappKeypairSecret = dappKeypairSecret
    },
    updateSession: (state, { payload: { session } }: WalletPayload) => {
      state.session = session
    },
  },
})

export const {
  updateWalletPublicKey,
  updateSharedSecret,
  updateKeypairSecret,
  updateSession,
} = slice.actions

export const isSmsWallet = (state: RootState) => state.wallet.isSmsWallet
export const walletPublicKey = (state: RootState) =>
  state.wallet.walletPublicKey

export const sharedSecretSelector = (state: RootState) =>
  state.wallet.sharedSecret

export const keypairSecretSelector = (state: RootState) =>
  state.wallet.dappKeypairSecret

export const sessionSelector = (state: RootState) => state.wallet.session

export default slice.reducer

export type WalletState = {
  isSmsWallet: boolean
  walletPublicKey?: string
  sharedSecret?: string
  dappKeypairSecret?: string
  session?: string
}

export type WalletPayload = {
  payload: Partial<WalletState>
}
