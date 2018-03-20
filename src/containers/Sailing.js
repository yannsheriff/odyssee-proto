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
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  handleBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleBack}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        {/* <Sailing {...this.props} /> */}
        <Compass {...this.props} />
        
      </View>
    );
  }
}
