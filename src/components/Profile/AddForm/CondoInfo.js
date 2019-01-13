import React, { Component } from "react";
// import Select from "react-select";
import ReactPhoneInput from "react-phone-input-2";
import "./AddForm2.css";
import { Select, Button } from "antd";
import { Animation } from "mdbreact";

const Option = Select.Option;

//select things
const locations = [
	{ value: "Bole Arabsa", label: "Bole Arabsa" },
	{ value: "Abado", label: "Abado" },
	{ value: "Ayat 1", label: "Ayat 1" },
	{ value: "Ayat 2", label: "Ayat 2" }
];
const types = [
	{ value: "Studio", label: "Studio" },
	{ value: "One bedroom", label: "One bedroom" },
	{ value: "Two bedroom", label: "Two bedroom" },
	{ value: "Three bedroom", label: "Three bedroom" }
];
const statuses = [
	{ value: "For sell", label: "For sell" },
	{ value: "For rent", label: "For rent" }
];
const floors = [
	{ vlaue: "0", label: "Ground floor" },
	{ vlaue: "1", label: "1st floor" },
	{ vlaue: "2", label: "2nd floor" },
	{ vlaue: "3", label: "3rd floor" },
	{ vlaue: "4", label: "4th floor" },
	{ vlaue: "5", label: "5th floor" },
	{ vlaue: "6", label: "6th floor" },
	{ vlaue: "7", label: "7th floor" },
	{ vlaue: "8", label: "8th floor" },
	{ vlaue: "9", label: "9th floor" },
	{ vlaue: "10", label: "10th floor" }
];

class CondoInfo extends Component {
	render() {
		return (
			<div className="d-flex justify-content-center flex-column">
				{this.props.errorMessage && (
					<Animation type="bounceIn">
						<p className="error-message monospace">
							{" "}
							{this.props.errorMessage}
						</p>
					</Animation>
				)}
				<Animation type="zoomInDown" duration="600ms">
					<div className="d-flex justify-content-center flex-wrap other-inputs-container">
						<div>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder="Location"
								optionFilterProp="children"
								onChange={this.props.handleLocChange}
								value={
									this.props.state.location
										? this.props.state.location
										: "Location"
								}
								className="select-options location z-depth-1-half"
								filterOption={(input, option) =>
									option.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
							>
								{locations.map(loc => (
									<Option value={loc.value} key={loc.value}>
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
								onChange={this.props.handleTypeChange}
								value={
									this.props.state.type
										? this.props.state.type
										: "Bedroom"
								}
								className="select-options type z-depth-1-half"
							>
								{types.map(type => (
									<Option value={type.value} key={type.value}>
										{type.label}
									</Option>
								))}
							</Select>
						</div>
						<div>
							<Select
								style={{ width: 200 }}
								placeholder="Floor"
								optionFilterProp="children"
								onChange={this.props.handleFloorChange}
								value={
									this.props.state.floor
										? this.props.state.floor
										: "Floor"
								}
								className="select-options location z-depth-1-half"
							>
								{floors.map(floor => (
									<Option
										value={floor.label}
										key={floor.value}
									>
										{floor.label}
									</Option>
								))}
							</Select>
						</div>
						<div>
							<Select
								style={{ width: 160 }}
								placeholder="For"
								optionFilterProp="children"
								value={
									this.props.state.status
										? this.props.state.status
										: "For"
								}
								onChange={this.props.handleStatusChange}
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
							<input
								type="text"
								value={this.props.state.price}
								onChange={this.props.handelPriceChange}
								placeholder={
									this.props.pricePlaceH
										? this.props.pricePlaceH
										: this.props.state.status.toLowerCase() ===
										  "for sell"
											? "Selling Amount(Birr)"
											: "Renting Price(Birr/month)"
								}
								className="select-options input-price z-depth-1-half"
								required
							/>
						</div>
						<div>
							<input
								type="text"
								value={this.props.state.area}
								onChange={this.props.handleAreaChange}
								placeholder="area in m square"
								className="select-options input-area z-depth-1-half"
								required
							/>
						</div>{" "}
						<div>
							{this.props.isTyping &&
								this.props.state.phoneNo.length !== 13 && (
									<Animation type="bounceIn">
										<p className="invalid-number monospace">
											{" "}
											Invalid phone number{" "}
										</p>
									</Animation>
								)}
							<ReactPhoneInput
								defaultCountry={"et"}
								onChange={this.props.handlePhoneChange}
								inputExtraProps={{
									required: true
								}}
								value={this.props.state.phoneNo}
								className="select-options "
								required
							/>
						</div>
					</div>
				</Animation>
				<div className="steps-action">
					<Button
						type="primary"
						className="next-btn step-btn"
						onClick={this.props.nextMain}
					>
						Next
					</Button>

					<Button
						className="prev-btn step-btn"
						style={{ marginLeft: 8 }}
						onClick={this.props.prev}
					>
						Previous
					</Button>
				</div>
			</div>
		);
	}
}

export default CondoInfo;
