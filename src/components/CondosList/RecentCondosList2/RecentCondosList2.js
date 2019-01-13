import React, { Component } from "react";
import RecentListCondoCard from "./RecentListCondoCard";
import "../FeaturedCondosList2/featured2.css";
import axios from "axios";

class RecentCondosList extends Component {
	constructor() {
		super();
		this.state = {
			recentCondos: []
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:8000/get_recent_condos")
			.then(res => {
				this.setState({ recentCondos: res.data.recentCondos });
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="featured2-main-container shadow-3">
				{" "}
				<h6 className="featured2-header-text"> Recent Condominiums</h6>
				<div className="featured2-condos-container">
					{this.state.recentCondos.map(condo => (
						<RecentListCondoCard key={condo.id} condo={condo} />
					))}
				</div>
			</div>
		);
	}
}

export default RecentCondosList;
