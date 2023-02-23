import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { Alert, Linking } from 'react-native'
import { Config } from '@/Config'
import { useDispatch, useSelector } from 'react-redux'
import {
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

interface WalletContextState {
  connect: () => Promise<void>
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
  const wallet = useSelector(walletPublicKey)
  const nearbyConfig = useMemo<NearbyConfig>(
    () => ({ apiKey: Config.NEARBY_MESSAGES_API_KEY }),
    [],
  )
  const { nearbyMessages } = useNearbySubscription(nearbyConfig)
  const nearbyStatus = useNearbyPublication(
    nearbyConfig,
    `Hello from: ${wallet}`,
  )
  const dispatch = useDispatch()
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
    setLogs(logs => [...logs, '> ' + log])
  }, [])
  const dappKeyPair = useMemo(() => {
    if (dappKeyPairSecret) {
      return nacl.box.keyPair.fromSecretKey(bs58.decode(dappKeyPairSecret))
    }
    return undefined
  }, [dappKeyPairSecret])

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

  useEffect(() => {
    if (!dappKeyPairSecret) {
      dispatch(
        updateKeypairSecret({
          dappKeypairSecret: bs58.encode(nacl.box.keyPair()?.secretKey),
        }),
      )
    }
  }, [])

  useEffect(() => {
    if (nearbyMessages) {
      console.log(nearbyMessages)
    }
  }, [nearbyMessages])

  return (
    <WalletContext.Provider
      value={{
        connect,
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
