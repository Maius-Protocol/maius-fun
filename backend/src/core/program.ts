import {
  MaiusEventManageProgram,
  MAIUS_EVENT_MANAGE_PROGRAM_ADDRESS,
} from '../sdk'
import base58 from 'bs58'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { AnchorProvider } from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Keypair, Connection, clusterApiUrl } from '@solana/web3.js'
import { PROGRAMS_IDLS } from '@/sdk'

export const walletKeypair = Keypair.fromSecretKey(
  base58.decode(
    '5A1v58EfgcwxX2BXkndTewGfzUgwaqk2LF3USs5T3DddgxzrnvgcwbaMyr5sUWjWTKM1fZjZYkuygNnpZunxG3pu',
  ),
)

export type ClusterType = 'mainnet-beta' | 'testnet' | 'devnet' | 'custom'

type SolanaCluster = {
  label: string
  network: ClusterType
  endpoint: string
}

type Cluster = {
  mainnet: SolanaCluster
  testnet: SolanaCluster
  devnet: SolanaCluster
  custom: SolanaCluster
}

export const CLUSTERS: Cluster = {
  mainnet: {
    label: 'Mainnet (Solana)',
    network: 'mainnet-beta',
    endpoint:
      'https://rpc.helius.xyz/?api-key=3335ba9e-dad8-419d-b1e9-9deaa1f084b2',
  },
  testnet: {
    label: 'Testnet',
    network: 'testnet',
    endpoint: clusterApiUrl('testnet'),
  },
  devnet: {
    label: 'Devnet',
    network: 'devnet',
    endpoint: clusterApiUrl('devnet'),
  },
  custom: {
    label: 'Custom RPC',
    network: 'custom',
    endpoint: 'http://127.0.0.1:8899',
  },
}

export const selectProgram =
  (programs: Program[]) => (programAddress: string) =>
    programs.find(program => program.programId.toBase58() === programAddress)

export const GetWallet = () => {
  let nodeWallet = new NodeWallet(walletKeypair)
  return nodeWallet
}

export const AnchorProviderProvider = () => {
  let wallet = GetWallet()
  let cluster = CLUSTERS.devnet
  const c = new Connection(cluster.endpoint)

  if (!wallet) {
    // @ts-ignore
    return new AnchorProvider(c, Keypair.generate(), {})
  }
  const provider = new AnchorProvider(c, wallet, {
    preflightCommitment: 'processed',
    commitment: 'processed',
  })
  return provider
}

export const GetAnchorProvider = () => {
  const context = AnchorProviderProvider()

  return context
}

export const ProgramsProvider = () => {
  let anchorProvider = GetAnchorProvider()

  const Programs = Object.entries(PROGRAMS_IDLS).map(([programId, idls]) => {
    // default to first idl version for each program id.
    const [[, firstIdl]] = Object.entries(idls)
    return new Program(
      firstIdl,
      programId,
      anchorProvider,
    ) as unknown as Program
  })
  return Programs
}

export const usePrograms = () => {
  const Programs = ProgramsProvider()

  if (!Programs) {
    throw new Error(
      'Make sure to wrap your component with ClockworkProgramsProvider',
    )
  }

  return Programs
}

export const GetMaiusEventManageProgram = () => {
  const programs = usePrograms()
  const program = selectProgram(programs)(
    MAIUS_EVENT_MANAGE_PROGRAM_ADDRESS,
  ) as unknown as MaiusEventManageProgram
  if (!programs) {
    throw new Error('Network program not found.')
  }
  return program
}
