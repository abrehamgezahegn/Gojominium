import React, { Component } from "react";
import FeaturedCard from "./FeaturedCard";
import "./featured2.css";
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
			<div className="featured2-main-container shadow-3">
				{" "}
				<h6 className="featured2-header-text">
					{" "}
					Featured condominuims{" "}
				</h6>
				<div className="featured2-condos-container">
					{this.state.featuredCondos.map(condo => (
						<FeaturedCard key={condo.id} condo={condo} />
					))}
				</div>
			</div>
		);
	}
}

export default FeaturedCondosList;