import _ from 'lodash'
import React, { Component } from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import { Colors } from '@/Theme/Variables'

// TODO: add finisher animation (check icon animation or something)
/**
 * @description: Scanner component for progress indication
 * @extends: Animated.View
 * @gif: https://media.giphy.com/media/l49JVcxoclUXbryiA/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardScannerScreen.js
 */
export default class AnimatedScanner extends Component {
  static displayName = 'AnimatedScanner'

  static defaultProps = {
    progress: 0,
    duration: 1000,
  }

  constructor(props) {
    super(props)

    this.state = {
      animatedProgress: new Animated.Value(0),
      isDone: false,
    }
  }

  componentDidMount() {
    const { progress, duration } = this.props

    if (progress > 0) {
      this.animate(progress, duration)
    }
  }

  componentDidUpdate(prevProps) {
    const { progress, duration } = this.props

    if (prevProps.progress !== progress) {
      this.animate(progress, duration)
    }
  }

  componentWillUnmount() {
    this.state.animatedProgress.stopAnimation()
  }

  animate(toValue, duration) {
    const { animatedProgress } = this.state

    Animated.timing(animatedProgress, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        const isDone = toValue >= 100
        this.setState({ isDone })
        _.invoke(this.props, 'onBreakpoint', { progress: toValue, isDone })
      }
    })
  }

  render() {
    const { opacity, backgroundColor, hideScannerLine, style, containerStyle } =
      this.props
    const { isDone, animatedProgress } = this.state

    return (
      <View style={[{ ...StyleSheet.absoluteFillObject }, containerStyle]}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(66,66,66,0.8)',
              opacity: 0.9,
            },
            style,
            opacity && { opacity },
            backgroundColor && { backgroundColor },
            {
              left: animatedProgress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          {isDone && !hideScannerLine && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'transparent',
              }}
            />
          )}
        </Animated.View>
      </View>
    )
  }
}
