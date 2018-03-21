import React, { Component } from 'react';

import Svg,{
  Circle
} from 'react-native-svg';

export default class circle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      circlesToRender: this.props.circlesToRender
    }
  }

  renderCircles () {
    return this.props.circlesToRender.map((c) => {
      return (
        <Circle
          key={ c.id }
          cx={ c.x }
          cy={ c.y }
          r="2%"
          fill="red"
        />
      )
    })
  }

  render(){
    return(
      this.renderCircles()
    )
  }
}
