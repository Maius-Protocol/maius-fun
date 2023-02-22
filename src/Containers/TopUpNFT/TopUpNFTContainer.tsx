import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Divider from '@/Components/Divider'
import Slider from '@react-native-community/slider'
import { Config } from '@/Config'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@ant-design/react-native'
import { useMutation } from 'react-query'
import { useRoute } from '@react-navigation/native'

const TopUpNFTContainer = () => {
  const route = useRoute()
  const params = route.params as any
  const eventAccountAddress = params?.eventAccountAddress
  const [numberOfNFTs, setNumberOfNFTs] = React.useState(0)
  const { Gutters, Layout, Fonts, Colors } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const textStyle = [Fonts.bold, { fontSize: 16 }, Gutters.smallBMargin]
  const totalEst = (Config.FEE_PER_NFT * numberOfNFTs)?.toFixed(2)

  const disabled = numberOfNFTs <= 0

  return (
    <View style={[Layout.fill]}>
      <ScrollView
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularTPadding,
        ]}
      >
        <View>
          <Text style={[Fonts.textLarge, Fonts.bold, Fonts.textBlack]}>
            Top-up NFTs
          </Text>
        </View>
        <Divider />

        <View style={[Gutters.regularTMargin]}>
          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Number of NFTs</Text>

            <Slider
              style={[Layout.fullWidth, { height: 40 }]}
              minimumValue={0}
              value={numberOfNFTs}
              step={1}
              maximumValue={1000}
              onValueChange={value => setNumberOfNFTs(value)}
              minimumTrackTintColor={Colors.gray}
              maximumTrackTintColor="#000000"
            />
            <Text>{numberOfNFTs}</Text>
          </View>

          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Fee</Text>
            <Text>{Config.FEE_PER_NFT} SOL per NFT</Text>
          </View>
          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Total Estimation</Text>
            <Text>{totalEst} SOL</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          Gutters.regularHPadding,
          { marginBottom: bottom + 32 },
          Gutters.smallTMargin,
        ]}
      >
        <Button type="primary" disabled={disabled}>
          <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
            Pay {totalEst} SOL
          </Text>
        </Button>
      </View>
    </View>
  )
}

export default TopUpNFTContainer
