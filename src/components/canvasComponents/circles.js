import React, { Component } from 'react';

import Svg,{
  Rect
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
        <Rect
          key={ c.id }
          x={ c.x }
          y={ c.y }
          width={7}
          height={7}
          fill="red"
          scale={1}
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
