import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import { Config } from '@/Config'
import { useDispatch, useSelector } from 'react-redux'
import {
  isSmsWallet,
  keypairSecretSelector,
  sessionSelector,
  sharedSecretSelector,
  updateKeypairSecret,
  updateSession,
  updateSharedSecret,
  updateWalletPublicKey,
  walletPublicKey,
} from '@/Store/Wallet'
import { decryptPayload, encryptPayload } from '@/Utils/payload'
import { buildUrl } from '@/Utils/buildUrl'
import { Buffer } from 'buffer'
import {
  useNearbyPublication,
  useNearbySubscription,
} from 'react-native-google-nearby-messages'
import { NearbyConfig } from 'react-native-google-nearby-messages'
import messaging from '@react-native-firebase/messaging'
import { AppRoutes, navigate, navigationRef } from '@/Navigators/utils'
import useAuthorization from '@/Hooks/useAuthorization'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol'
import { web3 } from '@project-serum/anchor'
import { connection } from '@/Config/program'

interface WalletContextState {
  connect: () => Promise<void>
  connectViaSMS: () => Promise<void>
  disconnect: () => Promise<void>
  signAndSendTransaction: (serializedTransaction: Buffer) => Promise<void>
}
interface WalletContextProps {
  children: React.ReactNode
}

const WalletContext = React.createContext<WalletContextState | undefined>(
  undefined,
)

const WalletProvider: React.FunctionComponent<WalletContextProps> = ({
  children,
}): JSX.Element => {
  const [FCMToken, setFCMToken] = useState<string>('')
  const wallet = useSelector(walletPublicKey)
  const nearbyConfig = useMemo<NearbyConfig>(
    () => ({ apiKey: Config.NEARBY_MESSAGES_API_KEY }),
    [],
  )
  // const nearbyStatus = useNearbyPublication(
  //   nearbyConfig,
  //   `Hello from:[${wallet}]-[${FCMToken}]`,
  // )
  const dispatch = useDispatch()
  const { authorizeSession: authorizeSMSWallet, selectedAccount } =
    useAuthorization()
  const _isSmsWallet = useSelector(isSmsWallet)
  const dappKeyPairSecret = useSelector(keypairSecretSelector)
  const sharedSecretStr = useSelector(sharedSecretSelector)
  const session = useSelector(sessionSelector)
  const sharedSecret = bs58.decode(sharedSecretStr || '')
  const [deepLink, setDeepLink] = useState<string>('')
  const [logs, setLogs] = useState<string[]>([])
  const addLog = useCallback((log: string) => {
    if (log?.includes('errorMessage')) {
      Alert.alert('Error', log)
    }
    if (log?.includes('Transaction is sent successfully!')) {
      Alert.alert('Transaction is sent successfully!')
    }
    setLogs(logs => [...logs, '> ' + log])
  }, [])
  const dappKeyPair = useMemo(() => {
    if (dappKeyPairSecret) {
      return nacl.box.keyPair.fromSecretKey(bs58.decode(dappKeyPairSecret))
    }
    return undefined
  }, [dappKeyPairSecret])

  const connectViaSMS = async () => {
    await transact(async wallet => {
      const freshAccount = await authorizeSMSWallet(wallet)

      dispatch(
        updateWalletPublicKey({
          walletPublicKey: freshAccount?.publicKey?.toBase58()!,
          isSmsWallet: true,
        }),
      )
    })
  }
  const connect = async () => {
    if (!dappKeyPair) {
      return
    }
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: Config.SOLANA_CLUSTER,
      app_url: Config.APP_URL,
      redirect_link: `${Config.IOS_APP_SCHEME}://onConnect`,
    })

    const url = buildUrl('connect', params)
    await Linking.openURL(url)
  }

  const handleDeepLink = ({ url }: { url: string }) => {
    setDeepLink(url)
  }

  const signAndSendTransaction = async (serializedTransaction: Buffer) => {
    if (!dappKeyPair) {
      return
    }
    const payload = {
      session,
      transaction: bs58.encode(serializedTransaction),
    }
    if (_isSmsWallet) {
      const res = await transact(async wallet => {
        await authorizeSMSWallet(wallet)
        const send = await wallet.signAndSendTransactions({
          payloads: [serializedTransaction.toString('base64')],
        })
        return send
      })
      await res
      addLog('Transaction is sent successfully!')
      return
    }

    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret)

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: `${Config.IOS_APP_SCHEME}://onSignAndSendTransaction`,
      payload: bs58.encode(encryptedPayload),
    })

    addLog('Sending transaction...')
    const url = buildUrl('signAndSendTransaction', params)
    console.log(url)
    await Linking.openURL(url)
  }

  const disconnect = async () => {
    dispatch(
      updateWalletPublicKey({
        walletPublicKey: undefined,
        isSmsWallet: false,
      }),
    )
  }
  console.log(logs)

  useEffect(() => {
    if (!dappKeyPair || !deepLink) {
      return
    }

    const url = new URL(deepLink)
    const params = url.searchParams

    if (params.get('errorCode')) {
      addLog(JSON.stringify(Object.fromEntries([...params]), null, 2))
      return
    }
    if (url.toString()?.includes('onConnect')) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get('phantom_encryption_public_key')!),
        dappKeyPair.secretKey,
      )

      const connectData = decryptPayload(
        params.get('data')!,
        params.get('nonce')!,
        sharedSecretDapp,
      )

      dispatch(
        updateSharedSecret({ sharedSecret: bs58.encode(sharedSecretDapp) }),
      )
      dispatch(updateSession({ session: connectData.session }))
      dispatch(
        updateWalletPublicKey({
          walletPublicKey: connectData.public_key,
          isSmsWallet: false,
        }),
      )

      addLog(JSON.stringify(connectData, null, 2))
    }
    if (url.toString()?.includes('onSignAndSendTransaction')) {
      const signAndSendTransactionData = decryptPayload(
        params.get('data')!,
        params.get('nonce')!,
        sharedSecret,
      )

      addLog(JSON.stringify(signAndSendTransactionData, null, 2))
    }
  }, [deepLink])

  useEffect(() => {
    const myHandler = async () => {
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl) {
        setDeepLink(initialUrl)
      }
    }
    myHandler()
    const listener = Linking.addEventListener('url', handleDeepLink)
    return () => {
      Linking.removeSubscription(listener)
    }
  }, [])

  async function requestUserPermission() {
    if (Platform.OS === 'android') {
      // await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      // )
    }
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log('Authorization status:', authStatus)
    }
    await messaging().registerDeviceForRemoteMessages()
    const token = await messaging().getToken()
    setFCMToken(token)
  }

  useEffect(() => {
    requestUserPermission()
    if (!dappKeyPairSecret) {
      dispatch(
        updateKeypairSecret({
          dappKeypairSecret: bs58.encode(nacl.box.keyPair()?.secretKey),
        }),
      )
    }
  }, [])
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.notification?.title?.includes('NFT request')) {
        navigate(AppRoutes.RECEIVED_NFT, {
          solanaUrl: remoteMessage?.data?.url,
          ...remoteMessage?.data,
        })
      }
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return unsubscribe
  }, [])

  return (
    <WalletContext.Provider
      value={{
        connect,
        connectViaSMS,
        disconnect,
        signAndSendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet(): WalletContextState {
  const context = useContext<any>(WalletContext)

  if (!context) {
    console.log('useWallet not wrapped')
  }
  return context
}

export default WalletProvider
