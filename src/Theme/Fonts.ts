/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'
import { Colors } from '@/Theme/Variables'

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    regular: { fontFamily: 'DMSans-Regular' },
    italic: { fontFamily: 'DMSans-Italic' },
    medium: { fontFamily: 'DMSans-Medium' },
    bold: { fontFamily: 'DMSans-Bold' },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textGray: {
      color: Colors.text,
    },
    textBlack: {
      color: 'black',
    },
    textWhite: {
      color: 'white',
    },
  })
}
