import React from "react";
import "./style.css";
export default class extends React.Component {
  static defaultProps = {
    is: "textarea"
  };
  ref = React.createRef();
  componentDidMount() {
    this.props.onMount(this.ref.current);
    console.log("this.ref.current: ", this.ref.current);
  }
  render() {
    const { is: Is, onMount, ...props } = this.props;
    return (
      <div
        id="container"
        style={{
          width: "100%",
          height: 900
        }}
        {...props}
      >
        <Is ref={this.ref} />
      </div>
    );
  }
}
