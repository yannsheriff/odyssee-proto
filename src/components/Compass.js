import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LayoutAnimation,
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
import RNSimpleCompass from 'react-native-simple-compass';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  container: {
    position: 'absolute',
    top: 100
  }
});



export default class Compass extends Component {
  static propTypes = {
    // alert: PropTypes.func.isRequired,
    sailing: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  

  constructor(props) {
    super(props);
    this.touchLastPos = undefined
    this.state = {
      deg : 0,
      orientation: 0,
      isCompassLocked: false,
      ij: 1
    }
  }


  callbackOrientation = () => {
    this.props.didChangeOrientation(this.state.orientation)
  }


  componentDidMount() {
    LayoutAnimation.spring()
    const degree_update_rate = 1; // Number of degrees changed before the callback is triggered
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({orientation: degree})
      // RNSimpleCompass.stop(); 
    });
        
  }

  _toggleCompassLock() {
    const degree_update_rate = 1;
    if (this.state.isCompassLocked) {
      this.setState({isCompassLocked: false})
      RNSimpleCompass.start(degree_update_rate, (degree) => {
        this.setState({orientation: degree})
      });
      
    } else {
      this.setState({isCompassLocked: true})
      RNSimpleCompass.stop()
      
    }
  }

  handleCompassDrag(evt) {
    if (this.state.isCompassLocked) {
      if (this.touchLastPos) {
        var diff = this.touchLastPos - evt.nativeEvent.pageX          
        var newOrientation = this.state.orientation + diff / 5
        this.setState({orientation: newOrientation})
        this.touchLastPos = evt.nativeEvent.pageX  
      } else {
        console.log("start")
        this.touchLastPos = evt.nativeEvent.pageX 
      }
    }
  }

  componentDidUpdate() {
    this.callbackOrientation()
  }

  render() {

    return (
      <View style={styles.container} >
        <Text> { this.state.orientation }</Text>
        <Text> { this.touchLastPos ? this.touchLastPos : 'undifined' }</Text>
        <TouchableOpacity onPress={this._toggleCompassLock.bind(this)}>
          <Text style={styles.back}>{this.state.isCompassLocked ?  'unlock' : 'lock'}</Text>
        </TouchableOpacity>
      <View
        onStartShouldSetResponder = {(evt) => true}
        onMoveShouldSetResponder = {(evt) => true}
        onResponderMove = {this.handleCompassDrag.bind(this)}

        onResponderRelease= {(evt) => {
          console.log("end")
          this.touchLastPos = undefined
          this.setState({ij: 2})
        }}

        style={{
            transform: [{ rotate: -this.state.orientation+'deg' },],
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
        </View>
      </View>
    );
  }
}
