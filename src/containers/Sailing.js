import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sailing from '../components/Sailing';
import Compass from '../components/Compass';
import * as SailingActions from '../actions/sailing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
        <Sailing {...this.props} />
        <Compass {...this.props} />
        
      </View>
    );
  }
}
