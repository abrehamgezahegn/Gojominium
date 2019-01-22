import React, { Component } from "react";
import { Modal } from "antd";
import "./Login_Modal.css";
import WrappedNormalLoginForm from "./Login_SignUp_Form/WrappedNormalLoginForm";
import { AuthConsumer } from "../../contexts/MyAuthProvider";

class LoginModal extends Component {
  render() {
    return (
      <div>
        <AuthConsumer>
          {context => (
            <Modal
              title="Login"
              centered
              visible={context.isModalVisible}
              onOk={() => context.setModalVisible(false)}
              onCancel={() => context.setModalVisible(false)}
              maskClosable={false}
            >
              <WrappedNormalLoginForm
                setModalVisible={context.setModalVisible}
                grantAccess={context.grantAccess}
                setUserId={context.setUserId}
              />
            </Modal>
          )}
        </AuthConsumer>
      </div>
    );
  }
}

export default LoginModal;
