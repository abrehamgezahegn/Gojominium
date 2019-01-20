import React, { Component } from "react";
import FeaturedCondosList2 from "./FeaturedCondosList2/FeaturedCondosList2";
import Filters from "./Filters/Filters";
import MainCondosList from "./MainCondosList/MainCondosList";
import RecentCondosList2 from "./RecentCondosList2/RecentCondosList2";
import "./CondosList.css";
import axios from "axios";
import { herokuApi } from "../../config/apiroutes";

class CondosList extends Component {
	constructor() {
		super();
		this.state = {
			allCondominiums: [],
			offsetAll: 0,
			isDisplayingFiltered: false,
			isLoading: false,
			message: ""
		};
	}
	componentWillMount() {
		window.scrollTo(0, 0);
		this.setState({ isLoading: true });
		axios
			.get(`${herokuApi}/get_all_condos/${this.state.offsetAll}`)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({
							allCondominiums: res.data.allCondominiums,
							offsetAll: this.state.offsetAll + 1,
							isLoading: false
						});
					}
				}
			})
			.catch(err => console.log);
	}

	handleGetFilteredCondos = filters => {
		const { location, type, sellorrent, minPrice, maxPrice } = filters;

		this.setState({ isDisplayingFiltered: true, isLoading: true });
		axios
			.get(
				`${herokuApi}/get_filtered_condos/${location}/${type}/${sellorrent}/${minPrice}/${maxPrice}`
			)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({
							allCondominiums: res.data.filteredCondos,
							isLoading: false
						});
					}
				}
				this.setState({
					offsetFiltered: this.state.offsetFiltered + 1
				});
			})
			.then(() => {
				if (this.state.allCondominiums.length === 0) {
					this.setState({ isLoading: false });
				}
			})
			.catch(err => console.log(err));
	};

	handleClearFilters = () => {
		this.setState({ isDisplayingFiltered: false, offsetAll: 1 });
		this.setState({ isLoading: true });
		axios
			.get(`${herokuApi}/get_all_condos/${0}`)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({
							allCondominiums: res.data.allCondominiums,
							isLoading: false
						});
					}
				}
			})
			.catch(err => console.log(err));
	};

	handleLoadMore = () => {
		this.setState({ isLoading: true });
		axios
			.get(`${herokuApi}/get_all_condos/${this.state.offsetAll}`)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						if (res.data.allCondominiums.length === 0) {
							this.setState({ isLoading: false });
						}
						this.setState({
							allCondominiums: res.data.allCondominiums,
							offsetAll: this.state.offsetAll + 1,
							isLoading: false
						});
						window.scrollTo(0, 140);
					}
				}
			})
			.catch(err => {
				this.setState({
					isLoading: false,
					Message: "something went worng please refresh the page!!"
				});
				console.log(err);
			});
	};

	handleLoadPrev = () => {
		this.setState({ isLoading: true });
		axios
			.get(`${herokuApi}/get_all_condos/${this.state.offsetAll - 2}`)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						if (res.data.allCondominiums.length === 0) {
							return;
						}
						this.setState({
							allCondominiums: res.data.allCondominiums,
							offsetAll: this.state.offsetAll - 1,
							isLoading: false
						});
						window.scrollTo(0, 140);
					}
				}
			})
			.catch(err => console.log(err));
	};

	render() {
		console.log(this.state.allCondominiums);
		return (
			<div>
				{" "}
				<Filters
					handleGetFilteredCondos={this.handleGetFilteredCondos}
					handleClearFilters={this.handleClearFilters}
				/>
				{this.state.allCondominiums.length > 0 &&
				this.state.isDisplayingFiltered ? (
					<h5
						style={{
							color: "rgba(0,0,0,0.8)",
							fontWeight: "600"
						}}
						className="text-center"
					>
						{" "}
						Results of your search{" "}
					</h5>
				) : (
					<p> </p>
				)}
				<div className="the-main-container">
					<div className="d-flex flex-column">
						<FeaturedCondosList2 /> <RecentCondosList2 />
					</div>{" "}
					<MainCondosList
						allCondominiums={this.state.allCondominiums}
						handleLoadPrev={this.handleLoadPrev}
						handleLoadMore={this.handleLoadMore}
						offsetAll={this.state.offsetAll}
						isDisplayingFiltered={this.state.isDisplayingFiltered}
						isLoading={this.state.isLoading}
						message={this.state.message}
					/>
				</div>
			</div>
		);
	}
}

export default CondosList;
