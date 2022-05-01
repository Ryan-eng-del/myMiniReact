export default function forwardRef(renderFn) {
  /* const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
  }; */
  return {
    /* 注意这里使用forwardRef包裹的组件的$$typeof不是ReactElement$$typeof,而是ReactElement当中的type对象当中的$$typeof*/
    $$typeof: REACT_FORWARD_REF_TYPE,
    renderFn,
  };
}
/* forwardRef组件示例 */
import React from 'react'

const TargetComponent = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
))

export default class Comp extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.ref.current.value = 'ref get input'
  }

  render() {
    return <TargetComponent ref={this.ref} />
  }
}