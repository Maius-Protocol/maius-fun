import { Dimensions } from 'react-native'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const maximumRes = (res: number) => {
  if (res > 360) {
    return 360
  }
  return res
}
