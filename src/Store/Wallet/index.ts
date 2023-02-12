import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/Store'

const slice = createSlice({
  name: 'wallet',
  initialState: {
    walletPublicKey: undefined,
  } as WalletState,
  reducers: {
    updateWalletPublicKey: (state, { payload: { walletPublicKey } }: any) => {
      if (typeof walletPublicKey !== 'undefined') {
        state.walletPublicKey = walletPublicKey
      }
    },
  },
})

export const { updateWalletPublicKey } = slice.actions

export const walletPublicKey = (state: RootState) =>
  state.wallet.walletPublicKey

export default slice.reducer

export type WalletState = {
  walletPublicKey?: string
}
