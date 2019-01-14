import React, { Component } from "react";
import "../featuredCondos/featuredCondos.css";
import DashCondoCard from "../DashCondoCard/DashCondoCard";
import axios from "axios";

class RecentCondosList extends Component {
	constructor() {
		super();
		this.state = {
			recentCondos: []
		};
	}
	componentWillMount() {
		axios
			.get("https://gojominium-api.herokuapp.com/get_recent_condos")
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
				<h5 className="featured-header-text"> Recent Condominuims</h5>
				<div className="recent-condos-container">
					{recentCondos.length < 10 && (
						<Spin spinnig={recentCondos.length < 10} />
					)}
					{recentCondos.length === 10 &&
						recentCondos.map(condo => (
							<DashCondoCard key={condo.id} condo={condo} />
						))}
				</div>
			</div>
		);
	}
}

export default RecentCondosList;
