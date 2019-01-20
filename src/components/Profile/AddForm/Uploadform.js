import React, { Component } from "react";
import { Upload, Icon, Button } from "antd";
import "./AddForm.css";
import { Animation } from "mdbreact";

class Uploadfrom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: this.props.images,
			errMessage: ""
		};
	}

	componentDidMount() {
		this.setState({ images: this.props.images });
	}

	handleImageChange = e => {
		const images = [...e.target.files];

		this.setState({ images: [...e.target.files] });
	};

	handleImageNext = e => {
		if (this.state.images.length === 0) {
			this.setState({ errMessage: "Please post atleast one picture" });
		} else if (this.state.images.length > 10) {
			this.setState({
				errMessage: "More than 10 pictures is not allowed"
			});
		} else {
			this.props.nextImage(this.state.images);
		}
	};

	render() {
		return (
			<div className="upload-container">
				<p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
					{" "}
					Please choose upto 10 pictures to be posted{" "}
				</p>
				{this.state.errMessage && (
					<Animation type="bounceIn">
						<p
							className="error-message monospace"
							style={{ fontSize: "" }}
						>
							{" "}
							{this.state.errMessage}
						</p>
					</Animation>
				)}
				<section className="section-preview">
					<div
						className="file-field  d-flex justify-content-center flex-wrap"
						style={{ width: "100%" }}
					>
						<div className="upload-btn-wrapper">
							<Button className="upload-btn mr-2">
								Upload Images
							</Button>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={this.handleImageChange}
							/>
						</div>
						<div className="file-name-list">
							{this.state.images.map(image => (
								<p key={image.name}> {image.name} </p>
							))}
						</div>
					</div>
				</section>

				<div className="steps-action">
					<Button
						type="primary"
						className="next-btn step-btn mb-1"
						onClick={this.handleImageNext}
					>
						Next
					</Button>
				</div>
			</div>
		);
	}
}

export default Uploadfrom;
