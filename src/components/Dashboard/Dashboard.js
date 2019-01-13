import React, { Component } from "react";
import CarouselPage from "./carousel/Carousel";
import FeaturedCondosList from "./featuredCondos/FeaturedCondosList";
import RecentCondosList from "./RecentCondominiums/RecentCondosList";
class Dashboard extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="d-flex flex-column">
				<CarouselPage />
				<FeaturedCondosList />
				<RecentCondosList />
			</div>
		);
	}
}

export default Dashboard;
