import React, { Component } from "react";
import RecentListCondoCard from "./RecentListCondoCard";
import "../FeaturedCondosList2/featured2.css";
import axios from "axios";
import { Spin } from "antd";
import { herokuApi } from "../../../config/apiroutes";

class RecentCondosList extends Component {
	constructor() {
		super();
		this.state = {
			recentCondos: []
		};
	}

	componentDidMount() {
		axios
			.get(`${herokuApi}/get_recent_condos`)
			.then(res => {
				this.setState({ recentCondos: res.data.recentCondos });
			})
			.catch(err => console.log(err));
	}

	render() {
		const { recentCondos } = this.state;
		return (
			<div className="featured2-main-container shadow-3">
				{" "}
				<h6 className="featured2-header-text"> Recent Apartments</h6>
				<div className="featured2-condos-container">
					{recentCondos.length < 5 && (
						<div
							className="d-flex justify-content-center"
							style={{ width: "100%" }}
						>
							<Spin spinning={recentCondos.length < 5} />
						</div>
					)}
					{recentCondos.length > 5 &&
						recentCondos.map(condo => (
							<RecentListCondoCard key={condo.id} condo={condo} />
						))}
				</div>
			</div>
		);
	}
}

export default RecentCondosList;
