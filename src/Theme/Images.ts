import { ThemeVariables } from './theme'

export default function ({}: ThemeVariables) {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    placeholder: require('@/Assets/Images/placeholder.jpg'),

    animations: {
      image: require('@/Assets/Animations/5856-image-picture.json'),
      camera: require('@/Assets/Animations/9948-camera-pop-up.json'),
      wifi: require('@/Assets/Animations/75488-wifi-bounce.json'),
      wallet: require('@/Assets/Animations/118205-wallet.json'),
    },
  }
}
