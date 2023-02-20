import React, { useContext, useEffect, useMemo } from 'react'
import { PublicKey } from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { AnchorProvider, Program, setProvider } from '@project-serum/anchor'
import { connection, IDL, programID } from '@/Config/program'
import { MaiusEventManage } from '@/types/maius_event_manage'

interface ProgramContextState {
  program: Program<MaiusEventManage>
}
interface ProgramContextProps {
  children: React.ReactNode
}

const ProgramContext = React.createContext<ProgramContextState | undefined>(
  undefined,
)

const ProgramProvider: React.FunctionComponent<ProgramContextProps> = ({
  children,
}): JSX.Element => {
  const _walletPublickey = useSelector(walletPublicKey)

  const wallet = useMemo(() => {
    if (_walletPublickey) {
      return {
        signTransaction: () => Promise.reject(),
        signAllTransactions: () => Promise.reject(),
        publicKey: new PublicKey(_walletPublickey),
      }
    }
    return undefined
  }, [_walletPublickey])

  const provider = useMemo(() => {
    if (wallet) {
      return new AnchorProvider(
        connection,
        wallet,
        AnchorProvider.defaultOptions(),
      )
    }
    return undefined
  }, [wallet])

  const _program: Program<MaiusEventManage> = new Program(
    IDL,
    programID,
    provider,
  )

  useEffect(() => {
    if (provider) {
      setProvider(provider)
    }
  }, [provider])
  return (
    <ProgramContext.Provider
      value={{
        program: _program,
      }}
    >
      {children}
    </ProgramContext.Provider>
  )
}

export function useProgram(): ProgramContextState {
  const context = useContext<any>(ProgramContext)

  if (!context) {
    console.log('useProgram not wrapped')
  }
  return context
}

export default ProgramProvider
