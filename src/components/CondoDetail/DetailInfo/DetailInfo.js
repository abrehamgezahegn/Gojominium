import React, { Component } from "react";
import "./DetailInfo.css";
import { Fa } from "mdbreact";

class DetailInfo extends Component {
	formatWithComma = price => {
		const priceF = parseFloat(price);

		return priceF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	render() {
		const { condo } = this.props;
		return (
			<div className="detail-mainContainer">
				<span className="d-flex flex-row mb-2 w-100 justify-content-end">
					<button
						type="button"
						className=" btn  btn-rounded rent-sell-btn mr-3"
					>
						{condo.sellorrent}
					</button>
				</span>
				<span className="d-flex flex-row mb-2">
					<div className="d-flex flex-row">
						{" "}
						<Fa
							icon="money"
							size="lg"
							className="mr-3 ml-3 mt-1"
						/>{" "}
						<h4 className="price">
							{" "}
							{this.formatWithComma(condo.price)}
							Birr
						</h4>
						{condo.sellorrent === "for rent" || "For rent" ? (
							<p
								style={{
									fontSize: "13px",
									marginBottom: "0px",
									marginTop: "3px",
									color: "rgba(255,255,255,0.6)"
								}}
							>
								{" "}
								/month{" "}
							</p>
						) : (
							<p> </p>
						)}{" "}
					</div>
				</span>
				<span className="d-flex flex-row mb-2">
					<div className="d-flex flex-row">
						{" "}
						<Fa
							icon="map-marker"
							size="lg"
							className="mr-4 ml-3 mt-1"
						/>
						<h4> {condo.location} </h4>{" "}
					</div>
				</span>
				<span className="d-flex flex-row mb-2">
					<div className="d-flex flex-row">
						{" "}
						<Fa icon="bed" size="lg" className="mr-4 ml-3 mt-1" />
						<h5> {condo.type} </h5>{" "}
					</div>
				</span>
				<span className="d-flex flex-row mb-2">
					<div className="d-flex flex-row">
						{" "}
						<Fa
							icon="building"
							size="lg"
							className="mr-4 ml-3 mt-1"
						/>{" "}
						<h5> {condo.floor} </h5>{" "}
					</div>
				</span>

				<span className="d-flex flex-row mb-2">
					<div className="d-flex flex-row">
						{" "}
						<Fa
							icon="building"
							size="lg"
							className="mr-4 ml-3 mt-1"
						/>{" "}
						<h5> {condo.area} </h5>{" "}
						<p style={{ marginBottom: "opx" }}> m.sq </p>{" "}
					</div>
				</span>

				<span className="d-flex flex-row mb-2">
					<div className="d-flex flex-row">
						<Fa
							icon="mobile"
							size="lg"
							className="mr-4 ml-3 mt-1"
						/>{" "}
						<h5> {condo.phonenumber} </h5>
					</div>
				</span>

				<div>
					<h6 className=" mt-2 ml-2  font-weight-bold d-additional-f">
						{" "}
						Additional Features{" "}
					</h6>
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

				<span className="d-flex flex-column mb-2 ml-2 mt-1">
					<h6 className="font-weight-bold detail-description">
						{" "}
						Description{" "}
					</h6>{" "}
					{!!condo.description ? (
						<h6>{condo.description}</h6>
					) : (
						<p
							style={{
								color: "rgba(255,255,255,0.5)",
								marginLeft: "10px",
								fontSize: "14px"
							}}
						>
							{" "}
							No description{" "}
						</p>
					)}
				</span>
			</div>
		);
	}
}

export default DetailInfo;
