import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Tra
} from 'react-native';
import Immutable from 'immutable';
import Images from '../assets/images'
import ScreenSize from '../helpers/ScreenSize'

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default class Compass extends Component {
  static propTypes = {
    // alert: PropTypes.func.isRequired,
    sailing: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      deg :  new Animated.Value(1),
      spin: '0deg'
    }
  }


  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.deg,
        {
          toValue: 100,
          duration: 6000,
        }
      )
    ]).start()
    this.state.spin = this.state.deg.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    })
  }


  render() {
    return (
      <View>
      <Animated.View  
        style={{
            transform: [
              { rotate: this.state.spin },
            ],
            position: 'absolute',
            left: 0,
            top: 270
          }}
          >

        <Image
        
          style={{
            width: ScreenSize.width,
            resizeMode: 'contain',
          }}
          source={Images.compass}
          resizeMethod="scale"
        />
        </Animated.View>
      </View>
    );
  }
}
