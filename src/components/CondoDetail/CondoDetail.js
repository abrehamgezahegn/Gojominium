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
			condo: {}
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
			})
			.catch(err => console.log(err));
	}

	render() {
		if (!this.state.condo) {
			return (
				<div
					style={{ width: "100%" }}
					className="d-flex justify-content-center"
				>
					<Spin spinning={!!this.state.condo} />{" "}
				</div>
			);
		} else {
			return (
				<div className="condo-detail-page-main-container">
					<CondoImages />
					<DetailInfo condo={this.state.condo} />
				</div>
			);
		}
	}
}

export default CondoDetail;
