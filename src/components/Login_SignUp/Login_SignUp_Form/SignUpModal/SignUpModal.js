import React, { Component } from "react";
import { Modal } from "antd";
import "../../Login_Modal.css";
import WrappedNormalSignUpForm from "./NormalSignUpForm";

class SignUpModal extends Component {
  render() {
    return (
      <div>
        <Modal
          title="Sign up"
          centered
          visible={this.props.modal2Visible}
          onOk={() => this.props.setModal2Visible(false)}
          onCancel={() => this.props.setModal2Visible(false)}
        >
          <WrappedNormalSignUpForm
            grantAccess={this.props.grantAccess}
            setUserId={this.props.setUserId}
            setModal2Visible={this.props.setModal2Visible}
          />
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;
