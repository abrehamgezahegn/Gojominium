import React, { Component } from "react";
import "./recentPosts.css";
import { Fa } from "mdbreact";
import { Link } from "react-router-dom";

class CondoCard extends Component {
	formatWithComma = price => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	render() {
		const { condo } = this.props;
		return (
			<div style={{ padding: "3px 10px 3px 10px", hieght: "200px" , marginRight: "20px"}}>
				<div className="card">
					<div className="view overlay">
						<img
							className="card-img-top"
									src={condo.image1 || "https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png"
}							alt="condo-card"
						/>

						<a href="#!">
							<div className="mask rgba-white-slight" />
						</a>
					</div>

					<div className="card-body">
						<div className="d-flex justify-content-between">
							{" "}
							<Link to={`/detail/${condo.id}`}>
								More <Fa icon="angle-double-right" />
							</Link>
							<button
								type="button"
								className=" btn  btn-rounded rent-sell-btn"
							>
								<p className="rent-sell-text">
									{" "}
									{condo.sellorrent}{" "}
								</p>
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
								{condo.sellorrent === "For rent" ? (
									<p
										style={{
											fontSize: "13px",
											marginBottom: "2px"
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
						</div>
						<div className="d-flex justify-content-between mt-2">
							<button
								type="button"
								className=" btn  btn-rounded delete-btn"
								onClick={() => {
									this.props.setModalVisible(true, condo.id);
								}}
							>
								<Fa icon="trash" className="delete-icon" />
							</button>{" "}
							<Link
								to={{
									pathname: "./editform",
									state: {
										editCondo: condo
									}
								}}
							>
								<button
									type="button"
									className=" btn  btn-rounded edit-btn"
								>
									Edit
									<Fa icon="edit" className="edit-icon" />
								</button>{" "}
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CondoCard;
