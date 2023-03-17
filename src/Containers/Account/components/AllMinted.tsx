import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useQuery } from 'react-query'
import useMintedNfts, {
  useJsonContent,
} from '@/Services/modules/events/useMintedNfts'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { wp } from '@/Theme/Variables'
import { useTheme } from '@/Hooks'
import { ActivityIndicator } from '@ant-design/react-native'
import { AppRoutes, navigate } from '@/Navigators/utils'
import { Config } from '@/Config'

interface ImageContainerProps {
  jsonUrl: string
}

const ImageContainer = ({ jsonUrl }: ImageContainerProps) => {
  const { Layout, Colors } = useTheme()
  const { data, isLoading } = useJsonContent(jsonUrl)

  const image = data?.data?.image
  if (isLoading) {
    return (
      <View
        style={[
          Layout.fullSize,
          { backgroundColor: Colors.gray },
          Layout.center,
        ]}
      >
        <ActivityIndicator color="white" />
      </View>
    )
  }
  return <Image style={[Layout.fullSize]} source={{ uri: image }} />
}

const AllMinted = () => {
  const { data, isLoading } = useMintedNfts()
  const { Images, Layout, Fonts, Colors, Gutters } = useTheme()

  const nfts = data?.data?.data
  return (
    <View
      style={[Layout.row, { flexWrap: 'wrap' }, Layout.justifyContentBetween]}
    >
      {isLoading && (
        <View
          style={[Layout.fullWidth, Layout.row, Layout.justifyContentBetween]}
        >
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item
              width={wp('42%')}
              height={wp('42%')}
              borderRadius={2}
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item
              width={wp('42%')}
              height={wp('42%')}
              borderRadius={2}
            />
          </SkeletonPlaceholder>
        </View>
      )}
      <View style={[Layout.row, { flexWrap: 'wrap' }, Gutters.smallTMargin]}>
        {nfts?.map((nft, index) => {
          return (
            <View
              key={`NFT-${nft.uri}-${index}`}
              style={[
                {
                  width: wp('46%'),
                  height: wp('46%'),
                },
                Gutters.smallRPadding,
                Gutters.smallBPadding,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  navigate(AppRoutes.WEBVIEW, {
                    url: `https://solana.fm/address/${nft?.mintAddress}?cluster=${Config.SOLANA_CLUSTER}`,
                  })
                }}
                style={[Layout.fullSize, Layout.borderRadius]}
              >
                <ImageContainer jsonUrl={nft?.uri} />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default AllMinted
