import React, { Component } from 'react';
import Size from '../helpers/ScreenSize'
import Circles from './canvasComponents/circles.js'
import { LayoutAnimation } from 'react-native'

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
const vpRadius = Math.hypot(Size.width, Size.height) / 2
let circles = []
let circlesToRender = []
for (let i=0;i<=500;i++) {
  circles.push({
    id: i,
    x: Math.floor(Math.random() * maxXOffset),
    y: Math.floor(Math.random() * maxYOffset)
  })
}

const speedRadius = 2

export default class Sailing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      center: {
        x: ((maxXOffset / 2) - (Size.width / 2)) * -1,
        y: ((maxYOffset / 2) - (Size.height / 2)) * -1
      },
      cnv: {
        x: 0,
        y: 0
      },
      touch: {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        activated: true
      },
      deg: 0
    }
  }

  checkIfInViewport () {
    circlesToRender = []
    const cnvPos = this.state.cnv
    const currentCenterX = -(cnvPos.x + this.state.center.x) + (Size.width / 2)
    const currentCenterY = -(cnvPos.y + this.state.center.y) + (Size.height / 2)

    circles.forEach((c) => {
      const dist = Math.hypot(currentCenterX - c.x, currentCenterY - c.y)
      if (dist <= vpRadius) {
        circlesToRender.push(c)
      }
    })
  }

  updateMap () {
    if (this.state.touch.activated) {
      const s = this.state

      this.checkIfInViewport()
      const newX = s.cnv.x + (speedRadius) * Math.sin(s.deg * 0.0174533)
      const newY = s.cnv.y + (speedRadius) * Math.cos(s.deg * 0.0174533)
      const newDeg = s.deg + 0.1
      this.setState({
        cnv: {
          x: newX,
          y: newY
        },
        deg: newDeg
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
        onResponderRelease = {(evt) => {
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
          x={this.state.center.x}
          y={this.state.center.y}
          originX={maxXOffset / 2}
          originY={maxYOffset / 2}
          rotation={this.state.deg}
          scale={1}
        >
          <G
            width={maxXOffset}
            height={maxYOffset}
            x={this.state.cnv.x}
            y={this.state.cnv.y}
            scale={1}
          >
            <Circles
              circlesToRender={circlesToRender}
              deg={this.state.deg}
            />
          </G>
        </G>
      </Svg>
    );
  }
}