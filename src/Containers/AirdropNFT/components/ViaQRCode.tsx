import React from 'react'
import { Text, View } from 'react-native'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { useTheme } from '@/Hooks'
import QRCode from 'react-native-qrcode-svg'

const ViaQrCode = ({ url }: { url: string }) => {
  const { Images, Layout, Fonts, Gutters } = useTheme()

  return (
    <>
      <View style={[Layout.fill, Layout.center]}>
        <View
          style={[
            {
              height: windowWidth * 0.8,
              width: windowWidth * 0.8,
            },
            Layout.center,
          ]}
        >
          <QRCode size={maximumRes(windowWidth * 0.65)} value={url} />
        </View>
        <View style={[Layout.center, Gutters.largeTMargin]}>
          <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
            Scan this QR Code
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBlack,
              Fonts.regular,
              Fonts.textCenter,
              Gutters.smallTMargin,
            ]}
          >
            Using any QR Code scanner of your wallet
          </Text>
        </View>
      </View>
    </>
  )
}

export default ViaQrCode
