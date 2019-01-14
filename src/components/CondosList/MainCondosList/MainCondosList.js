import React, { Component } from "react";
import MainCondoCard from "./MainCondoCard/MainCondoCard";
import "./mainList.css";
import { Button, Spin } from "antd";

class MainCondosList extends Component {
	render() {
		return (
			<div style={{ width: "100%" }}>
				<div
					style={{
						width: "100%",
						marginTop: "50px",
						marginBottom: "30px"
					}}
					className="d-flex justify-content-center"
				>
					{" "}
					<Spin spinning={this.props.isLoading} />{" "}
				</div>

				{!this.props.isLoading && (
					<div className="main-list-container">
						{this.props.allCondominiums.map(condo => (
							<MainCondoCard key={condo.id} condo={condo} />
						))}
					</div>
				)}
				{!this.props.isDisplayingFiltered &&
					!this.props.isLoading && (
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
