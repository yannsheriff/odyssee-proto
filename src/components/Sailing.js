import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Immutable from 'immutable';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default class Sailing extends Component {
  static propTypes = {
    alert: PropTypes.func.isRequired,
    header: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { alert, header } = this.props;
    return (
      <View>
        <Text style={styles.text}> { }</Text>
        <TouchableOpacity onPress={alert}>
          <Text style={styles.back}> Alert </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
