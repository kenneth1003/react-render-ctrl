import React from 'react'
import {RenderCtrlProvider, withRenderCtrl} from 'react-render-ctrl';
import Button from './ButtonJS';


const App = () => {
  return <RenderCtrlProvider>
    <>
      <div>Hello</div>
      <Button />
    </>
  </RenderCtrlProvider>
}



export default withRenderCtrl(App, {

})
