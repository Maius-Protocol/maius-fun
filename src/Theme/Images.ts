import { ThemeVariables } from './theme'

export default function ({}: ThemeVariables) {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    animations: {
      image: require('@/Assets/Animations/5856-image-picture.json'),
      camera: require('@/Assets/Animations/9948-camera-pop-up.json'),
      wallet: require('@/Assets/Animations/12202-wallet.json'),
    },
  }
}
