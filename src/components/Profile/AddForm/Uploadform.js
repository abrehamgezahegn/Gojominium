import React, { Component } from "react";
import { Upload, Icon, Button } from "antd";
import "./AddForm.css";
import { Animation } from "mdbreact";

const fileList = [];

class Uploadfrom extends Component {
	props2 = {
		action: "//jsonplaceholder.typicode.com/posts/",
		listType: "picture",
		defaultFileList: [...fileList],
		className: "upload-list-inline",
		multiple: true,
		accept: "image/*",
		disabled: false,
		onChange: this.handleFileChange
	};

	render() {
		return (
			<div>
				<Animation type="zoomInDown" duration="600ms">
					<div className="upload-container">
						<Upload {...this.props2}>
							<Button className="upload-btn">
								<Icon type="upload" /> Choose
							</Button>
							<div className="d-flex justify-content-start upload-info-container">
								<p className="mb-1 mt-2 upload-info">
									{" "}
									You can only choose upto 10 images{" "}
								</p>
							</div>
						</Upload>
					</div>
				</Animation>
				<div className="steps-action">
					<Button
						type="primary"
						className="next-btn step-btn"
						onClick={this.props.nextImage}
					>
						Next
					</Button>
				</div>
			</div>
		);
	}
}

export default Uploadfrom;
