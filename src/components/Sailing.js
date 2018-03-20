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
    // alert: PropTypes.func.isRequired,
    sailing: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props) {
    super(props);
  }

  sendAlert() {
    const { alert } = this.props;
    console.log('ok')
    alert()
  }


  render() {
    const { alert, sailing } = this.props;
    console.log(sailing)
    return (
      <View>
        <Text style={styles.text}> { sailing.get('header') }</Text>
        <TouchableOpacity onPress={this.sendAlert.bind(this)}>
          <Text style={styles.back}> Alert </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
