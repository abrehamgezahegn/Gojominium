import React, { Component } from "react";
import CondoImages from "./ImageGallery/ImageGallery";
import DetailInfo from "./DetailInfo/DetailInfo";
import "./CondoDetail.css";
import axios from "axios";
import { Spin } from "antd";
import { herokuApi } from "../../config/apiroutes";

class CondoDetail extends Component {
	constructor() {
		super();
		this.state = {
			condo: {},
			condoImages: [],
			isLoading: true
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		axios
			.get(`${herokuApi}/get_a_condo/${this.props.match.params.condoId}`)
			.then(res => {
				if (res) {
					if (res.message !== "something went wrong") {
						this.setState({ condo: res.data.condo });
					}
				}
				return res.data.condo;
			})
			.then(condo => {
				if (!!condo.image1) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image1]
					});
				}
				if (!!condo.image2) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image2]
					});
				}
				if (!!condo.image3) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image3]
					});
				}
				if (!!condo.image4) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image4]
					});
				}
				if (!!condo.image5) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image5]
					});
				}
				if (!!condo.image6) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image6]
					});
				}
				if (!!condo.image7) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image7]
					});
				}
				if (!!condo.image8) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image8]
					});
				}
				if (!!condo.image9) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image9]
					});
				}
				if (!!condo.image10) {
					this.setState({
						condoImages: [...this.state.condoImages, condo.image10]
					});
				}

				this.setState({isLoading: false})
			})

			.catch(err => console.log(err));
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div
					style={{ width: "100%" , marginTop: "250px" , marginBottom:"100px" }}
					className="d-flex justify-content-center"
				>
					<Spin spinning={!!this.state.condo} />{" "}
				</div>
			);
		} else {
			return (
				<div className="condo-detail-page-main-container">
					<CondoImages
						condo={this.state.condo}
						condoImages={this.state.condoImages}
					/>
					<DetailInfo condo={this.state.condo} url={this.props.match.url} />
				</div>
			);
		}
	}
}

export default CondoDetail;
