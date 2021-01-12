import React from 'react'
import {RenderCtrlProvider, withRenderCtrl} from 'react-render-ctrl';
import Button from './ButtonTS';
import ButtonClass from './ButtonClassTS';


const App = () => {
  return <RenderCtrlProvider>
    <>
      <div>Hello</div>
      <ButtonClass />
      <Button />
    </>
  </RenderCtrlProvider>
}



export default withRenderCtrl(App)
