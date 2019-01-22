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

	onImageClear = () => {
		this.setState({ images: [] });
		this.props.onImageClear();
	};

	handleImageChange = e => {
		const images = [...e.target.files];

		this.setState({ images: [...this.state.images, ...e.target.files] });
	};

	handleImageNext = e => {
		let array = [];

		if (this.props.editImages) {
			array = this.props.editImages.filter(img => img !== null);
		}

		if (
			this.state.images.length === 0 &&
			this.props.editImages.length === 0
		) {
			this.setState({ errMessage: "Please post atleast one picture" });
		} else if (this.state.images.length + array.length > 10) {
			this.setState({
				errMessage: "More than 10 pictures is not allowed"
			});
		} else {
			this.props.nextImage(this.state.images);
		}
	};

	render() {
		const { editImages } = this.props;

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
						<div className="d-flex flex-column">
							<div className="upload-btn-wrapper">
								<Button className="upload-btn mr-2">
									Add Images
								</Button>

								<input
									type="file"
									accept="image/*"
									multiple
									onChange={this.handleImageChange}
								/>
							</div>{" "}
							<Button
								style={{
									width: "90px",
									backgroundColor: "#33b5e5",
									color: "white",
									marginBottom: "20px"
								}}
								onClick={this.onImageClear}
							>
								Clear
							</Button>
						</div>
						<div className="file-name-list">
							{editImages.length > 0 &&
								editImages.map(url => {
									if (url !== null) {
										return (
											<img
												src={url}
												className="upload-images"
											/>
										);
									}
								})}
							{this.state.images.map(image => (
								<p key={`${image.lastModified} ${image.size}`}>
									{" "}
									{image.name}{" "}
								</p>
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
