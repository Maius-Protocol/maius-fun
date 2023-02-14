import React, { useCallback, useContext, useEffect, useState } from 'react'
import { clusterApiUrl, Connection } from '@solana/web3.js'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { Linking } from 'react-native'
import { Config } from '@/Config'
import { useDispatch, useSelector } from 'react-redux'
import { updateWalletPublicKey, walletPublicKey } from '@/Store/Wallet'
import { decryptPayload } from '@/Utils/payload'
import { NETWORK } from '../Config/solana'
import { buildUrl } from '@/Utils/buildUrl'
interface WalletContextState {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
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
  const _walletPublickey = useSelector(walletPublicKey)
  const dispatch = useDispatch()
  const [deepLink, setDeepLink] = useState<string>('')
  const [logs, setLogs] = useState<string[]>([])
  const connection = new Connection(NETWORK)
  const addLog = useCallback(
    (log: string) => setLogs(logs => [...logs, '> ' + log]),
    [],
  )
  const [dappKeyPair] = useState(nacl.box.keyPair())
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>()
  const [session, setSession] = useState<string>()

  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: Config.SOLANA_CLUSTER,
      app_url: 'https://airdrop.maiuspay.com',
      redirect_link: `${Config.IOS_APP_SCHEME}://onConnect`,
    })

    const url = buildUrl('connect', params)
    await Linking.openURL(url)
  }

  const disconnect = async () => {
    dispatch(
      updateWalletPublicKey({
        walletPublicKey: undefined,
      }),
    )
  }

  useEffect(() => {
    if (!deepLink) return

    const url = new URL(deepLink)
    const params = url.searchParams

    if (url.toString()?.includes('onConnect')) {
      if (params.get('errorCode')) {
        addLog(JSON.stringify(Object.fromEntries([...params]), null, 2))
        return
      }
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get('phantom_encryption_public_key')!),
        dappKeyPair.secretKey,
      )

      const connectData = decryptPayload(
        params.get('data')!,
        params.get('nonce')!,
        sharedSecretDapp,
      )

      setSharedSecret(sharedSecretDapp)
      setSession(connectData.session)
      dispatch(
        updateWalletPublicKey({
          walletPublicKey: connectData.public_key,
        }),
      )

      addLog(JSON.stringify(connectData, null, 2))
    }
    // if (/onConnect/.test(url.pathname)) {
    //   const sharedSecretDapp = nacl.box.before(
    //     bs58.decode(params.get('phantom_encryption_public_key')!),
    //     dappKeyPair.secretKey,
    //   )
    //
    //   const connectData = decryptPayload(
    //     params.get('data')!,
    //     params.get('nonce')!,
    //     sharedSecretDapp,
    //   )
    //
    //   setSharedSecret(sharedSecretDapp)
    //   setSession(connectData.session)
    //   setPhantomWalletPublicKey(new PublicKey(connectData.public_key))
    //
    //   addLog(JSON.stringify(connectData, null, 2))
    // } else if (/onDisconnect/.test(url.pathname)) {
    //   addLog('Disconnected!')
    // } else if (/onSignAndSendTransaction/.test(url.pathname)) {
    //   const signAndSendTransactionData = decryptPayload(
    //     params.get('data')!,
    //     params.get('nonce')!,
    //     sharedSecret,
    //   )
    //
    //   addLog(JSON.stringify(signAndSendTransactionData, null, 2))
    // } else if (/onSignAllTransactions/.test(url.pathname)) {
    //   const signAllTransactionsData = decryptPayload(
    //     params.get('data')!,
    //     params.get('nonce')!,
    //     sharedSecret,
    //   )
    //
    //   const decodedTransactions = signAllTransactionsData.transactions.map(
    //     (t: string) => Transaction.from(bs58.decode(t)),
    //   )
    //
    //   addLog(JSON.stringify(decodedTransactions, null, 2))
    // } else if (/onSignTransaction/.test(url.pathname)) {
    //   const signTransactionData = decryptPayload(
    //     params.get('data')!,
    //     params.get('nonce')!,
    //     sharedSecret,
    //   )
    //
    //   const decodedTransaction = Transaction.from(
    //     bs58.decode(signTransactionData.transaction),
    //   )
    //
    //   addLog(JSON.stringify(decodedTransaction, null, 2))
    // } else if (/onSignMessage/.test(url.pathname)) {
    //   const signMessageData = decryptPayload(
    //     params.get('data')!,
    //     params.get('nonce')!,
    //     sharedSecret,
    //   )
    //
    //   addLog(JSON.stringify(signMessageData, null, 2))
    // }
  }, [deepLink])

  const handleDeepLink = ({ url }: { url: string }) => {
    setDeepLink(url)
  }

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

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
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
