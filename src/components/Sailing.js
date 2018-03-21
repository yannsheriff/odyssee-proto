import React, { Component } from 'react';
import Size from '../helpers/ScreenSize'
import Circles from './canvasComponents/circles.js'

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
  Text,
  Use,
  Defs,
  Stop,
  Image
} from 'react-native-svg';

const maxXOffset = 2000
const maxYOffset = 2000
let circles = []
let circlesToRender = []
for (let i=0;i<=500;i++) {
  circles.push({
    id: i,
    x: Math.floor(Math.random() * maxXOffset),
    y: Math.floor(Math.random() * maxYOffset)
  })
}

export default class Sailing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      center: {
        x: Size.width / 2,
        y: Size.height / 2
      },
      cnv: {
        x: -(maxXOffset / 2) - (Size.width / 2),
        y: -(maxYOffset / 2) - (Size.height / 2),
        prevX: 0,
        prevY: 0
      },
      touch: {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        activated: true
      }
    }
  }

  checkIfInViewport () {
    circlesToRender = []
    const cnvPos = this.state.cnv
    circles.forEach((c) => {
      if (c.x >= -cnvPos.x && c.x <= (-cnvPos.x + Size.width) && c.y >= -cnvPos.y && c.y <= (-cnvPos.y + Size.height)) {
        circlesToRender.push(c)
      }
    })
  }

  updateMap () {
    if (this.state.touch.activated) {
      this.checkIfInViewport()
      const newX = this.state.cnv.x - 2
      const newY = this.state.cnv.y + 2
      this.setState({
        cnv: {
          x: newX,
          y: newY
        }
      })
      requestAnimationFrame(this.updateMap.bind(this))
    }
  }

  updateTouchPos (evt) {
    const t = this.state.touch
    if (t.x !== t.prevX || t.y !== t.prevY) {
      this.setState({
        touch: {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY
        }
      })
    }
  }

  render() {
    return (
      <Svg
        height={Size.height}
        width={Size.width}
        onStartShouldSetResponder = {(evt) => true}
        onMoveShouldSetResponder = {(evt) => true}

        onResponderGrant = {(evt) => {
          console.log((maxYOffset / 2), (Size.height / 2), this.state.cnv.y)
          this.setState({
            touch: {
              x: evt.nativeEvent.pageX,
              y: evt.nativeEvent.pageY,
              activated: true
            }
          })
          requestAnimationFrame(this.updateMap.bind(this))
        }}
        onResponderMove = {(evt) => {
          //this.updateTouchPos(evt)
        }}
        onResponderRelease= {(evt) => {
          this.setState({
            touch: {
              activated: false
            }
          })
        }}
      >
        <G
          width={maxXOffset}
          height={maxYOffset}
          x={this.state.cnv.x}
          y={this.state.cnv.y}
        >
          <Rect
            x={(maxXOffset / 2) - 50}
            y={(maxYOffset / 2) - 50}
            width="100"
            height="100"
            fill="rgb(0,0,255)"
          />
          {/*<Circles*/}
            {/*circlesToRender={circlesToRender}*/}
          {/*/>*/}
        </G>
      </Svg>
    );
  }
}