import React, { Component } from "react";
import "../featuredCondos/featuredCondos.css";
import DashCondoCard from "../DashCondoCard/DashCondoCard";
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
	componentWillMount() {
		axios
			.get(`${herokuApi}/get_recent_condos`)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({ recentCondos: res.data.recentCondos });
					}
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const { recentCondos } = this.state;
		return (
			<div className="featured-main-container shadow-3">
				{" "}
				<h5 className="featured-header-text"> Recent Apartments</h5>
				<div className="condos-scroll-container">
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
							<DashCondoCard key={condo.id} condo={condo} />
						))}
				</div>
			</div>
		);
	}
}

export default RecentCondosList;
