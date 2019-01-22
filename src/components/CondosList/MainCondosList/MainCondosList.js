import React, { Component } from "react";
import MainCondoCard from "./MainCondoCard/MainCondoCard";
import "./mainList.css";
import { Button, Spin } from "antd";
import { storage } from "../../../firebase/firebaseConfig";

class MainCondosList extends Component {
	render() {
		return (
			<div style={{ width: "100%" }}>
				<div
					style={{
						width: "100%"
					}}
					className="d-flex justify-content-center"
				>
					{" "}
					<Spin
						spinning={this.props.isLoading}
						className="main-condo-list-spinner"
					/>{" "}
				</div>

				{!this.props.isLoading && (
					<div className="main-list-container">
						{this.props.allCondominiums.map(condo => (
							<MainCondoCard key={condo.id} condo={condo} />
						))}
					</div>
				)}

				{this.props.allCondominiums.length === 0 &&
					this.props.isDisplayingFiltered && (
						<h6
							style={{
								color: "rgba(0,0,0,0.8)",
								fontWeight: "600",
								fontSize: "20px",
								marginBottom: "60px",
								width: "100%"
							}}
							className="text-center"
						>
							{" "}
							Ooops, can't find you that!!
						</h6>
					)}

				{!!this.props.message && (
					<h6
						style={{
							color: "rgba(0,0,0,0.8)",
							fontWeight: "600",
							fontSize: "20px",
							marginBottom: "60px",
							width: "100%"
						}}
						className="text-center"
					>
						{" "}
						{this.props.message}
					</h6>
				)}

				{!this.props.isDisplayingFiltered && !this.props.isLoading && (
					<div className="text-center" style={{ width: "100%" }}>
						{this.props.offsetAll >= 2 && (
							<Button
								onClick={this.props.handleLoadPrev}
								style={{
									width: "80px",
									marginRight: "20px"
								}}
								type="primary"
							>
								{" "}
								Back{" "}
							</Button>
						)}
						<Button
							onClick={this.props.handleLoadMore}
							style={{ width: "80px" }}
							type="primary"
						>
							{" "}
							More{" "}
						</Button>
					</div>
				)}
			</div>
		);
	}
}

export default MainCondosList;
