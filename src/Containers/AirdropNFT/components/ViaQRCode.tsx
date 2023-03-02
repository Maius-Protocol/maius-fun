import React from 'react'
import { Text, View } from 'react-native'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { useTheme } from '@/Hooks'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ViaQrCode = ({ url }: { url: string }) => {
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <View style={[Layout.fill, Layout.center]}>
        <View style={[{ marginBottom: bottom + 32 }]}>
          <View
            style={[
              {
                height: windowWidth * 0.8,
                width: windowWidth * 0.8,
              },
              Layout.center,
            ]}
          >
            <QRCode
              logo={Images.logo_rounded}
              size={maximumRes(windowWidth * 0.65)}
              value={url}
            />
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
      </View>
    </>
  )
}

export default ViaQrCode
