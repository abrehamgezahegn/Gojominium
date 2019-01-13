import React, { Component } from "react";
import FeaturedCondosList2 from "./FeaturedCondosList2/FeaturedCondosList2";
import Filters from "./Filters/Filters";
import MainCondosList from "./MainCondosList/MainCondosList";
import RecentCondosList2 from "./RecentCondosList2/RecentCondosList2";
import "./CondosList.css";
import axios from "axios";

class CondosList extends Component {
	constructor() {
		super();
		this.state = {
			allCondominiums: [],
			offsetAll: 0,
			isDisplayingFiltered: false
		};
	}
	componentWillMount() {
		window.scrollTo(0, 0);
		axios
			.get(
				`https://gojominium-api.herokuapp.com/get_all_condos/${
					this.state.offsetAll
				}`
			)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({
							allCondominiums: res.data.allCondominiums,
							offsetAll: this.state.offsetAll + 1
						});
					}
				}
			})
			.catch(err => console.log(err));
	}

	handleGetFilteredCondos = filters => {
		const { location, type, sellorrent, minPrice, maxPrice } = filters;

		this.setState({ isDisplayingFiltered: true });
		axios
			.get(
				`https://gojominium-api.herokuapp.com/get_filtered_condos/${location}/${type}/${sellorrent}/${minPrice}/${maxPrice}`
			)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({
							allCondominiums: res.data.filteredCondos
						});
					}
				}
				this.setState({
					offsetFiltered: this.state.offsetFiltered + 1
				});
			})
			.catch(err => console.log(err));
	};

	handleClearFilters = () => {
		this.setState({ isDisplayingFiltered: false, offsetAll: 0 });

		axios
			.get(`https://gojominium-api.herokuapp.com/get_all_condos/${0}`)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						this.setState({
							allCondominiums: res.data.allCondominiums
						});
					}
				}
			})
			.catch(err => console.log(err));
	};

	handleLoadMore = () => {
		axios
			.get(
				`https://gojominium-api.herokuapp.com/get_all_condos/${
					this.state.offsetAll
				}`
			)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						if (res.data.allCondominiums.length === 0) {
							return;
						}
						this.setState({
							allCondominiums: res.data.allCondominiums,
							offsetAll: this.state.offsetAll + 1
						});
						window.scrollTo(0, 140);
					}
				}
			})
			.catch(err => console.log(err));
	};

	handleLoadPrev = () => {
		axios
			.get(
				`https://gojominium-api.herokuapp.com/get_all_condos/${this
					.state.offsetAll - 2}`
			)
			.then(res => {
				if (res) {
					if (res.data.message !== "something went wrong") {
						if (res.data.allCondominiums.length === 0) {
							return;
						}
						this.setState({
							allCondominiums: res.data.allCondominiums,
							offsetAll: this.state.offsetAll - 1
						});
						window.scrollTo(0, 140);
					}
				}
			})
			.catch(err => console.log(err));
	};

	render() {
		console.log(this.state);
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
				{this.state.allCondominiums.length === 0 &&
					this.state.isDisplayingFiltered && (
						<h6
							style={{
								color: "rgba(0,0,0,0.8)",
								fontWeight: "600",
								fontSize: "20px",
								marginBottom: "100px"
							}}
							className="text-center"
						>
							{" "}
							Ooops, can't find you that!!
						</h6>
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
					/>
				</div>
			</div>
		);
	}
}

export default CondosList;
