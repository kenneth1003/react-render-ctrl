import React, { Component } from 'react'
import { withRenderCtrl } from "react-render-ctrl"

interface ButtonProps {
  color?: string
  type?: number
}

class Button extends Component<ButtonProps> {
  render() {
    return <div>
      I am a button
    </div>
  }
}

export default withRenderCtrl(Button)
