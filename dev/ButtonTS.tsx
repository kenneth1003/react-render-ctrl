import { withRenderCtrl } from "react-render-ctrl"

interface ButtonProps {
  color?: string
  type?: number
}

const Button = ({
  color,
  type
}: ButtonProps) => <div>
  I am a button
</div>


export default withRenderCtrl(Button)
