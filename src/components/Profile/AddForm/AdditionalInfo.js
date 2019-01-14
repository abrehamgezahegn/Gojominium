import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import { Button, Spin } from "antd";
import { Animation } from "mdbreact";

class AdditionalInfo extends Component {
	render() {
		return (
			<div>
				<Animation type="zoomInDown" duration="600ms">
					<div>
						{!this.props.editCondo && (
							<div className="d-flex flex-column ">
								<div>
									<div className="d-flex flex-row justify-content-center">
										<p
											style={{
												color: "rgba(255,255,255,0.8)",
												marginBottom: "0px"
											}}
										>
											{" "}
											Do you want your condominium to be
											featured?{" "}
										</p>
										<div className="d-flex flex-row">
											<input
												type="checkbox"
												className="mt-1 mr-1 okay-checkbox"
												onChange={
													this.props.toggleFeatured
												}
												style={{
													cursor: "pointer",
													width: "30px"
												}}
											/>{" "}
											<p
												style={{
													color:
														"rgba(255,255,255,0.8)",
													fontSize: "16px",
													marginTop: "0px",
													marginBottom: "0px"
												}}
											>
												{" "}
												Okay{" "}
											</p>
										</div>
									</div>
								</div>
								<p
									style={{
										color: "rgba(255,255,255,0.5)",
										fontSize: "12px",
										marginTop: "0px"
									}}
								>
									{" "}
									(Little extra charge if you want your house
									to be on front for one week)
								</p>
							</div>
						)}
						<h5 className="features-header-text">
							{" "}
							Additional Features{" "}
						</h5>
						<CheckboxGroup
							name="fruits"
							value={[...this.props.state.addFeatures]}
							onChange={this.props.handleCheckChange}
							className="d-flex flex-wrap justify-content-center checkbox-container"
						>
							<Checkbox value="gypsum" className="checkbox-box" />{" "}
							<h6> Gypsum </h6>
							<Checkbox
								value="tiles"
								className="checkbox-box"
							/>{" "}
							<h6> Tiles </h6>
							<Checkbox
								value="kitchencabinet"
								className="checkbox-box"
							/>{" "}
							<h6> Kitchen Cabinet </h6>
							<Checkbox
								value="ceramics"
								className="checkbox-box"
							/>{" "}
							<h6> Ceramics </h6>
							<Checkbox
								value="spotlights"
								className="checkbox-box"
							/>{" "}
							<h6> Spot Lights </h6>
						</CheckboxGroup>
					</div>
					<textarea
						type="text"
						value={this.props.state.description}
						onChange={this.props.handleDescriptionChange}
						placeholder="Anything you would like to add....(optional)"
						className="select-options description z-depth-1-half"
					/>
				</Animation>
				<div className="steps-action">
					{!!this.props.editCondo ? (
						<div>
							<Button
								type="primary"
								className="done-btn step-btn"
								onClick={this.props.submitForm}
								disabled={this.props.isLoading}
							>
								Update
							</Button>
							<Spin
								spinning={this.props.isLoading}
								size="small"
								className="ml-2 mr-2"
							/>
						</div>
					) : (
						<div>
							<Button
								type="primary"
								className="done-btn step-btn"
								onClick={this.props.submitForm}
								disabled={this.props.isLoading}
							>
								Done
							</Button>
							<Spin
								spinning={this.props.isLoading}
								size="small"
								className="ml-2 mr-2"
							/>
						</div>
					)}

					<Button
						className="prev-btn step-btn"
						style={{ marginLeft: 8 }}
						onClick={this.props.prev}
					>
						Previous
					</Button>
					<p> {this.props.errorMessage}</p>
				</div>
			</div>
		);
	}
}

export default AdditionalInfo;
