import React, { Component } from "react";
import "./Filters.css";
import { Animation } from "mdbreact";
import { Select, Button } from "antd";
import axios from "axios";

const Option = Select.Option;

const locations = [
	{ value: " ", label: "-" },
	{ value: "Bole Arabsa", label: "Bole Arabsa" },
	{ value: "Abado", label: "Abado" },
	{ value: "Ayat 1", label: "Ayat 1" },
	{ value: "Ayat 2", label: "Ayat 2" }
];
const types = [
	{ value: " ", label: "-" },
	{ value: "Studio", label: "Studio" },
	{ value: "One bedroom", label: "One bedroom" },
	{ value: "Two bedroom", label: "Two bedroom" },
	{ value: "Three bedroom", label: "Three bedroom" }
];
const statuses = [
	{ value: " ", label: "-" },
	{ value: "for sell", label: "For sell" },
	{ value: "for rent", label: "For rent" }
];

class Filters extends Component {
	constructor() {
		super();
		this.state = {
			FLocation: " ",
			FType: " ",
			FStatus: " ",
			minPrice: "",
			maxPrice: ""
		};
	}

	handleFLocChange = value => {
		this.setState({ FLocation: value });
	};
	handleFTypeChange = value => {
		this.setState({ FType: value });
	};
	handleFStatusChange = value => {
		this.setState({ FStatus: value });
	};
	handleMinPrice = e => {
		const minPrice = e.target.value;
		if (minPrice.length < 14)
			if (!minPrice || minPrice.match(/^\d{1,}(\.\d{0,2})?$/)) {
				this.setState({ minPrice });
			}
	};
	handleMaxPrice = e => {
		const maxPrice = e.target.value;
		if (maxPrice.length < 14)
			if (!maxPrice || maxPrice.match(/^\d{1,}(\.\d{0,2})?$/)) {
				this.setState({ maxPrice });
			}
	};

	handleSubmit = () => {
		const { FLocation, FStatus, FType, minPrice, maxPrice } = this.state;
		if (
			FLocation.length > 2 ||
			FStatus.length > 2 ||
			FType.length > 2 ||
			minPrice ||
			maxPrice
		) {
			const filters = {
				location: this.state.FLocation,
				type: this.state.FType,
				sellorrent: this.state.FStatus,
				minPrice: this.state.minPrice
					? parseFloat(this.state.minPrice)
					: 0,
				maxPrice: this.state.maxPrice
					? parseFloat(this.state.maxPrice)
					: 9000000000000
			};

			this.props.handleGetFilteredCondos(filters);
		}
	};

	render() {
		return (
			<Animation type="zoomInDown" duration="600ms">
				<div className="tc main-container-container d-flex justify-content-center">
					<div className="filters-main-container shadow-3">
						{" "}
						<p className="filters-header">
							{" "}
							Use filters to find the best results{" "}
						</p>{" "}
						<div className="filters-form-container d-flex justify-content-center flex-wrap">
							<div>
								<Select
									showSearch
									style={{ width: 200 }}
									placeholder="Location"
									optionFilterProp="children"
									onChange={this.handleFLocChange}
									className="select-options location z-depth-1-half"
									filterOption={(input, option) =>
										option.props.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									{locations.map(loc => (
										<Option
											value={loc.value}
											key={loc.value}
										>
											{loc.label}
										</Option>
									))}
								</Select>
							</div>
							<div>
								<Select
									style={{ width: 160 }}
									placeholder="Type"
									optionFilterProp="children"
									onChange={this.handleFTypeChange}
									className="select-options type z-depth-1-half"
								>
									{types.map(type => (
										<Option
											value={type.value}
											key={type.value}
										>
											{type.label}
										</Option>
									))}
								</Select>
							</div>
							<div>
								<Select
									style={{ width: 160 }}
									placeholder="For"
									optionFilterProp="children"
									onChange={this.handleFStatusChange}
									className="select-options status z-depth-1-half"
								>
									{statuses.map(status => (
										<Option
											value={status.value}
											key={status.value}
										>
											{status.label}
										</Option>
									))}
								</Select>
							</div>
							<div>
								<div>
									{" "}
									<p className="font-weight-bold mb-2 range-header">
										Price Range(in Birr){" "}
									</p>
								</div>
								<div className="d-flex flex-row flex-wrap">
									<div className="d-flex flex-column">
										<div className="text-left ml-2 range-header">
											Lowest
										</div>
										<div>
											<input
												type="text"
												value={this.state.minPrice}
												onChange={this.handleMinPrice}
												placeholder="min price"
												className="select-options input-area range z-depth-1-half"
												required
											/>
										</div>
									</div>
									<div className="d-flex flex-column ">
										<div className="text-left ml-2 range-header">
											{" "}
											Highest
										</div>
										<input
											type="text"
											value={this.state.maxPrice}
											onChange={this.handleMaxPrice}
											placeholder="max price"
											className="select-options input-area range z-depth-1-half"
											required
										/>
									</div>{" "}
									<div>
										<Button
											type="primary"
											className="next-btn step-btn filter-submit ml-2"
											onClick={this.handleSubmit}
											icon="search"
										>
											Find
										</Button>
										<Button
											type="danger"
											className="next-btn step-btn filter-submit ml-3"
											onClick={
												this.props.handleClearFilters
											}
										>
											Clear
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="filter-submit-container" />
			</Animation>
		);
	}
}

export default Filters;
