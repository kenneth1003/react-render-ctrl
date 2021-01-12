import React, { Component } from 'react'
import { withRenderCtrl } from "react-render-ctrl"

class Button extends Component {
  render() {
    return <div>
      I am a button
    </div>
  }
}

export default withRenderCtrl(Button)
