import React, { Component } from "react";
import FeaturedCard from "./FeaturedCard";
import "./featured2.css";
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
		return (
			<div className="featured2-main-container shadow-3">
				{" "}
				<h6 className="featured2-header-text">
					{" "}
					Featured condominuims{" "}
				</h6>
				<div className="featured2-condos-container">
					{featuredCondos.length < 5 && (
						<div
							className="d-flex justify-content-center"
							style={{ width: "100%" }}
						>
							<Spin spinning={featuredCondos.length < 5} />
						</div>
					)}

					{featuredCondos.length > 6 &&
						featuredCondos.map(condo => (
							<FeaturedCard key={condo.id} condo={condo} />
						))}
				</div>
			</div>
		);
	}
}

export default FeaturedCondosList;
