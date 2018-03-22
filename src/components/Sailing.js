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
let degRect = 45

export default class Sailing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      center: {
        x: Size.width / 2,
        y: Size.height / 2
      },
      cnv: {
        x: ((maxXOffset / 2) - (Size.width / 2)) * -1,
        y: ((maxYOffset / 2) - (Size.height / 2)) * -1
      },
      rectPos: {
        x: (maxYOffset / 2) - 50,
        y: (maxYOffset / 2) - 50
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
    const currentCenterX = -cnvPos.x + (Size.width / 2)
    const currentCenterY = -cnvPos.y + (Size.height / 2)

    circles.forEach((c) => {
      const dist = Math.hypot(currentCenterX - c.x, currentCenterY - c.y)
      if (dist <= vpRadius) {
        circlesToRender.push(c)
      }
    })
  }

  updateMap () {
    if (this.state.touch.activated) {
      // HERE

      this.checkIfInViewport()
      const newX = this.state.cnv.x + (speedRadius) * Math.sin(degRect * 0.0174533)
      const newY = this.state.cnv.y + (speedRadius) * Math.cos(degRect * 0.0174533)
      const newX2 = this.state.rectPos.x - (speedRadius) * Math.sin(degRect * 0.0174533)
      const newY2 = this.state.rectPos.y - (speedRadius) * Math.cos(degRect * 0.0174533)
      this.setState({
        cnv: {
          x: newX,
          y: newY
        },
        rectPos: {
          x: newX2,
          y: newY2
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

  incrementDeg () {
    LayoutAnimation.spring()
    degRect = degRect + 3
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
          originX={maxXOffset / 2}
          originY={maxYOffset / 2}
          rotation={degRect}
          scale={1}
        >
          <Rect
            x={this.state.rectPos.x}
            y={this.state.rectPos.y}
            width="100"
            height="100"
            fill="rgb(0,0,255)"
            onPress={() => {this.incrementDeg()}}
            originX={maxXOffset / 2}
            originY={maxYOffset / 2}
            rotation={degRect}
          />
          <Circles
            circlesToRender={circlesToRender}
          />
        </G>
      </Svg>
    );
  }
}