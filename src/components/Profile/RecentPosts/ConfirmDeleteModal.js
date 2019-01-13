import React, { Component } from "react";
import { Modal, Button } from "antd";
import "../../Login_SignUp/Login_Modal.css";

class ConfirmDeleteModal extends Component {
  render() {
    return (
      <div>
        <Modal
          title="Confirm Please"
          centered
          visible={this.props.isModalVisible}
          onOk={() => this.props.setModalVisible(false)}
          onCancel={() => this.props.setModalVisible(false)}
        >
          <p className="text-center mt-2 mb-2"> Are you sure? </p>
          {
            <div className="text-center mb-3">
              <Button
                onClick={() => {
                  this.props.handleDelete(this.props.condoId);
                }}
                style={{
                  backgroundColor: "#c62828",
                  color: "rgba(255,255,255,0.8)"
                }}
              >
                {" "}
                Delete{" "}
              </Button>{" "}
              <Button
                onClick={() => {
                  this.props.setModalVisible(false);
                }}
              >
                {" "}
                Cancel{" "}
              </Button>
            </div>
          }
        </Modal>
      </div>
    );
  }
}

export default ConfirmDeleteModal;

{
  /*  */
}
