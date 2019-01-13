import React, { Component } from "react";
import "./featuredCondos.css";
import FeaturedDashCard from "./FeaturedDashCard";
import axios from "axios";

class FeaturedCondosList extends Component {
	constructor() {
		super();
		this.state = {
			featuredCondos: []
		};
	}

	componentDidMount() {
		axios
			.get("https://gojominium-api.herokuapp.com/get_featured_condos")
			.then(res => {
				this.setState({ featuredCondos: res.data.featuredCondos });
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="featured-main-container shadow-3">
				{" "}
				<h5 className="featured-header-text">
					{" "}
					Featured condominuims{" "}
				</h5>
				<div className="recent-condos-container">
					{this.state.featuredCondos.map(condo => (
						<FeaturedDashCard key={condo.id} condo={condo} />
					))}
				</div>
			</div>
		);
	}
}

export default FeaturedCondosList;
