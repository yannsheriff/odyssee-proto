import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Image,
    StyleSheet, 
    Text, 
    TouchableHighlight, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import Immutable from 'immutable';
import Images from '../assets/images'

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
  }



  render() {
    return (
      <View>

        <Image  
            style={{width: 50, height: 50}}
            source={Images.compass}
          />
      </View>
    );
  }
}
