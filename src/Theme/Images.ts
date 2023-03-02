import { ThemeVariables } from './theme'

export default function ({}: ThemeVariables) {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    logo_rounded: require('@/Assets/Images/logo_rounded.png'),
    placeholder: require('@/Assets/Images/placeholder.jpg'),
    blur_1: require('@/Assets/Images/blur_1.png'),
    blur_2: require('@/Assets/Images/blur_2.png'),
    blur_3: require('@/Assets/Images/blur_3.png'),
    animations: {
      image: require('@/Assets/Animations/5856-image-picture.json'),
      camera: require('@/Assets/Animations/9948-camera-pop-up.json'),
      wifi: require('@/Assets/Animations/75488-wifi-bounce.json'),
      share: require('@/Assets/Animations/113973-share.json'),
      scan: require('@/Assets/Animations/45696-scan.json'),
    },
  }
}
