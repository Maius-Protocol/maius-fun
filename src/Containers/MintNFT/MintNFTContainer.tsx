import React from 'react'
import { Button, View } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Image, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectedPhoto } from '@/Store/Wizard'
import AnimatedScanner from '@/Components/AnimatedScanner'
import { useMutation } from 'react-query'
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'

const MintNFTContainer = () => {
  const photo = useSelector(selectedPhoto)
  const { Images, Layout, Fonts, Gutters, MetricsSizes } = useTheme()
  const {} = useMutation(() => {
    let mint = Keypair.generate()
    console.log(`mint: ${mint.publicKey.toBase58()}`)
    let mint1 = Keypair.generate()
    console.log(`mint: ${mint.publicKey.toBase58()}`)
  })

  return (
    <View style={[Layout.fullSize, Layout.center, Gutters.regularHPadding]}>
      <View style={[Layout.fill, Layout.center]}>
        <View style={[Layout.shadow]}>
          <View
            style={[
              {
                height: windowWidth * 0.8,
                width: windowWidth * 0.8,
                borderRadius: MetricsSizes.small,
                overflow: 'hidden',
              },
              Gutters.largeBMargin,
            ]}
          >
            <Image
              source={{
                uri: 'https://source.unsplash.com/random',
              }}
              style={[
                Layout.fullSize,
                {
                  borderRadius: MetricsSizes.small,
                },
              ]}
            />
            <AnimatedScanner progress={100} duration={6000} />
          </View>
        </View>

        <View>
          <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
            Step 3: Let's mint NFT!
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBlack,
              Fonts.regular,
              Gutters.smallTMargin,
              Fonts.textCenter,
            ]}
          >
            Lorem ipsum
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
        <Button loading={false} onPress={() => {}} type="primary">
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>
            Mint NFT with Phantom
          </Text>
        </Button>
        {/*<TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>*/}
        {/*  <Text style={[Fonts.textGray, Fonts.textCenter]}>Skip</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

export default MintNFTContainer
