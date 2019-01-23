import React, { Component } from "react";
import { Card, CardBody, CardImage, Col } from "mdbreact";
import {
	FlippingCard,
	FlippingCardBack,
	FlippingCardFront
} from "react-ui-cards";
import { Fa } from "mdbreact";
import "./MainCondoCard.css";
import { Link } from "react-router-dom";
class MainCondoCard extends Component {
	formatWithComma = price => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	render() {
		const { condo } = this.props;
		return (
			<div className="main-card-container ">
				<FlippingCard>
					<FlippingCardBack>
						<div className="back-main-container d-flex flex-column">
							<div className="d-flex justify-content-between mb-4">
								{" "}
								<Link to={`/detail/${condo.id}`}>
									More <Fa icon="angle-double-right" />
								</Link>
								<button
									type="button"
									className=" btn  btn-rounded rent-sell-btn"
								>
									{condo.sellorrent}
								</button>{" "}
							</div>
							<div className="d-flex flex-column">
								<div className="d-flex flex-row align-items-center">
									<Fa
										icon="money"
										size="lg"
										className="card-icon"
									/>
									<p className="price">
										{" "}
										{this.formatWithComma(condo.price)}
										Birr{" "}
									</p>
									{condo.sellorrent.toLowerCase() ===
									"for rent" ? (
										<p
											style={{
												fontSize: "13px",
												marginBottom: "0px"
											}}
										>
											{" "}
											/month{" "}
										</p>
									) : (
										<p> </p>
									)}
								</div>
								<div className="d-flex flex-row">
									{" "}
									<Fa
										icon="bed"
										size="lg"
										className="card-icon"
									/>
									<p className="bed-rooms"> {condo.type}</p>{" "}
								</div>
								<div>
									<Fa
										icon="map-marker"
										size="lg"
										className="ml-2 mr-3"
									/>{" "}
									{condo.location}
								</div>
								<div>
									<Fa
										icon="building"
										size="lg"
										className="ml-2 mr-2 mt-1"
									/>{" "}
									{condo.floor}
								</div>
								<div>
									<Fa
										icon="mobile"
										size="lg"
										className="ml-2 mr-2 mt-1"
									/>{" "}
									{condo.phonenumber}
								</div>
								<div>
									<h5 className=" mt-5  font-weight-bold additional-f">
										{" "}
										Additional Features{" "}
									</h5>
									{condo.gypsum ||
									condo.kitchencabinate ||
									condo.ceramics ||
									condo.tiles ||
									condo.spotlights ? (
										<div className=" d-flex flex-row flex-wrap pl-3 ">
											{condo.gypsum && (
												<button
													type="button"
													className=" btn  btn-rounded rent-sell-btn  lime darken-3"
												>
													Gypsum
												</button>
											)}{" "}
											{condo.kitchencabinate && (
												<button
													type="button"
													className=" btn  btn-rounded rent-sell-btn  lime darken-3"
												>
													Kitchen Cabinet
												</button>
											)}{" "}
											{condo.ceramics && (
												<button
													type="button"
													className=" btn  btn-rounded rent-sell-btn  lime darken-3"
												>
													Ceramics
												</button>
											)}{" "}
											{condo.tiles && (
												<button
													type="button"
													className=" btn  btn-rounded rent-sell-btn  lime darken-3"
												>
													Tiles
												</button>
											)}{" "}
											{condo.spotlights && (
												<button
													type="button"
													className=" btn  btn-rounded rent-sell-btn  lime darken-3"
												>
													Spot Lights
												</button>
											)}{" "}
										</div>
									) : (
										<p
											style={{
												color: "rgba(255,255,255,0.5)",
												marginLeft: "10px",
												fontSize: "14px"
											}}
										>
											{" "}
											No additonal features{" "}
										</p>
									)}
								</div>
							</div>
						</div>
					</FlippingCardBack>
					<FlippingCardFront>
						<Col style={{ height: "300px" }}>
							<Card className="main-card shadow-1">
								<CardImage
									className=" main-card-img"
									src={
										condo.image1 ||
										"https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png"
									}
									waves
								/>
								<CardBody className="special-color-dark">
									<div className="d-flex justify-content-end">
										{" "}
										<button
											type="button"
											className=" btn  btn-rounded rent-sell-btn mr-1"
										>
											{condo.sellorrent}
										</button>{" "}
									</div>
									<div className="d-flex flex-column">
										<div className="d-flex flex-row align-items-center">
											<Fa
												icon="money"
												size="lg"
												className="card-icon"
											/>
											<p className="price">
												{" "}
												{this.formatWithComma(
													condo.price
												)}
												Birr{" "}
											</p>
											{condo.sellorrent.toLowerCase() ===
											"for rent" ? (
												<p
													style={{
														fontSize: "13px",
														marginBottom: "0px"
													}}
												>
													{" "}
													/month{" "}
												</p>
											) : (
												<p> </p>
											)}
										</div>
										<div className="d-flex flex-row">
											{" "}
											<Fa
												icon="bed"
												size="lg"
												className="card-icon"
											/>
											<p className="bed-rooms">
												{" "}
												{condo.type}
											</p>{" "}
										</div>
										<div>
											<Fa
												icon="map-marker"
												size="lg"
												className="ml-2 mr-3"
											/>{" "}
											{condo.location}
										</div>
									</div>
								</CardBody>
							</Card>
						</Col>
					</FlippingCardFront>
				</FlippingCard>
			</div>
		);
	}
}

export default MainCondoCard;
