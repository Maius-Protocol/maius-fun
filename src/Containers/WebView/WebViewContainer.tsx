import React from 'react'
import WebView from 'react-native-webview'
import { useRoute } from '@react-navigation/native'

const WebViewContainer = () => {
  const route = useRoute()
  const url = route?.params?.url as any
  return <WebView source={{ uri: url }} />
}
export default WebViewContainer
