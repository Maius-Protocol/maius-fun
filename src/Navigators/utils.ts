/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { store } from '@/Store'
import { EventType } from '@/types/schema'

type RootStackParamList = {
  Startup: undefined
  Home: undefined
  CHOOSE_FRAME: Partial<EventType>
  CAPTURE_PHOTO: undefined
  MINT_NFT: undefined
  AIRDROP_NFT: undefined
  ADD_NEW_EVENT: undefined
  ACCOUNT: undefined
  CONNECT_WALLET: undefined
  TOP_UP_NFTS: undefined
  UPDATE_EVENT: undefined
  CLOSE_EVENT: undefined
  CLAIM_VAULT: undefined
  RECEIVED_NFT: {
    solanaUrl: string
  }
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export enum AppRoutes {
  STARTUP = 'STARTUP',
  HOME = 'HOME',
  EVENTS = 'EVENTS',
  ADD_NEW_EVENT = 'ADD_NEW_EVENT',
  TOP_UP_NFTS = 'TOP_UP_NFTS',
  UPDATE_EVENT = 'UPDATE_EVENT',
  ACCOUNT = 'ACCOUNT',
  CONNECT_WALLET = 'CONNECT_WALLET',
  CHOOSE_FRAME = 'CHOOSE_FRAME',
  CAPTURE_PHOTO = 'CAPTURE_PHOTO',
  MINT_NFT = 'MINT_NFT',
  AIRDROP_NFT = 'AIRDROP_NFT',
  CLAIM_VAULT = 'CLAIM_VAULT',
  CLOSE_EVENT = 'CLOSE_EVENT',
  RECEIVED_NFT = 'RECEIVED_NFT',
}

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (!store.getState().wallet.walletPublicKey) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }, { name: AppRoutes.CONNECT_WALLET }],
      }),
    )
    return
  }
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}
