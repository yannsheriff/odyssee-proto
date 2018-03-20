import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Immutable from 'immutable';
import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  TextSvg,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

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
      <Svg
                height="100"
                width="100"
            >
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"
                />
                <Rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="red"
                    strokeWidth="2"
                    fill="yellow"
                />
            </Svg>
    );
  }
}
