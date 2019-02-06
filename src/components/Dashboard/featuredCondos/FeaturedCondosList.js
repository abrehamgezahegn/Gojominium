import React, { Component } from "react";
import "./featuredCondos.css";
import FeaturedDashCard from "./FeaturedDashCard";
import axios from "axios";
import { Spin } from "antd";
import { herokuApi } from "../../../config/apiroutes";

class FeaturedCondosList extends Component {
	constructor() {
		super();
		this.state = {
			featuredCondos: []
		};
	}

	componentDidMount() {
		axios
			.get(`${herokuApi}/get_featured_condos`)
			.then(res => {
				this.setState({ featuredCondos: res.data.featuredCondos });
			})
			.catch(err => console.log(err));
	}

	render() {
		const { featuredCondos } = this.state;
		console.log(featuredCondos);

		return (
			<div className="featured-main-container shadow-3">
				<h5 className="featured-header-text"> Featured Apartments </h5>
				<div className="condos-scroll-container">
					{featuredCondos.length < 3 && (
						<div
							className="d-flex justify-content-center"
							style={{ width: "100%" }}
						>
							<Spin spinning={featuredCondos.length < 3} />
						</div>
					)}
					{featuredCondos.length > 3 &&
						featuredCondos.map(condo => (
							<FeaturedDashCard key={condo.id} condo={condo} />
						))}
				</div>
			</div>
		);
	}
}

export default FeaturedCondosList;


