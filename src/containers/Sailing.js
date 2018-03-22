import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sailing from '../components/Sailing';
import Compass from '../components/Compass';
import * as SailingActions from '../actions/sailing';
import ScreenSize from '../helpers/ScreenSize'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    height: ScreenSize.height,
    position: 'relative'
  },
  back: {
    margin: 10,
    fontSize: 20,
  },
});

@connect(
  state => ({
    sailing: state.sailing,
  }),
  dispatch => bindActionCreators(SailingActions, dispatch),
)
export default class SailingContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orientation: 0
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  handleBack = () => {
    this.props.navigation.goBack();
  }

  _passOrientationToSailing = (deg) => {
    if (deg !== this.state.orientation) {
      this.setState({
        orientation: deg
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Sailing
          {...this.props}
          orientation={this.state.orientation}
        />
        <Compass
          {...this.props}
          style={{zIndex: 999}}
          didChangeOrientation={this._passOrientationToSailing}
        />
      </View>
    )
  }
}
