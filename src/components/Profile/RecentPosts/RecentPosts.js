import React, { Component } from "react";
import "./recentPosts.css";
import CondoCard from "./CondoCard";
import axios from "axios";
import jwt from "jsonwebtoken";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Spin } from "antd";
import { herokuApi } from "../../../config/apiroutes";

class RecentPosts extends Component {
	constructor() {
		super();
		this.state = {
			userCondominiums: [],
			userId: "",
			isModalVisible: false,
			condoId: "",
			isLoading: false,
			deleteLoading: false
		};
	}

	componentWillMount() {
		const token = localStorage.getItem("token");
		const { userId } = jwt.decode(token);
		this.setState({ isLoading: true });
		axios
			.get(`https://gojominium-api.herokuapp.com/get_condos/${userId}`)
			.then(res => {
				this.setState({
					userCondominiums: res.data.userCondos,
					isLoading: false
				});
			})
			.then(() => {
				if (this.state.userCondominiums.length === 0) {
					this.setState({ isLoading: false });
				}
			})
			.then(err => console.log(err));
	}

	setModalVisible = (isModalVisible, condoId) => {
		this.setState({ isModalVisible, condoId });
	};

	handleDelete = condoId => {
		this.setState({ deleteLoading: true });
		axios({
			method: "delete",
			url: "https://gojominium-api.herokuapp.com/delete_condo",
			data: {
				condoId: condoId
			}
		}).then(res => {
			if (res.data === "deleted") {
				const filteredCondos = this.state.userCondominiums.filter(
					condo => {
						return condo.id !== condoId;
					}
				);
				this.setState({
					userCondominiums: filteredCondos,
					deleteLoading: false
				});
				this.setModalVisible(false);
			} else {
				this.setState({ deleteLoading: false });
			}
		});
	};
	render() {
		return (
			<div className="recent-container recent-container2">
				{" "}
				<div className="recent-header shadow-3">
					<div>
						<p className="recent-header-text">
							{" "}
							Recetly posted by you{" "}
						</p>
					</div>
				</div>
				<div className="text-center mt-3 mb-5">
					{this.state.isLoading && (
						<Spin spinning={this.state.isLoading} />
					)}
				</div>
				{this.state.userCondominiums.length === 0 &&
				!this.state.isLoading ? (
					<div className="text-center mt-3 mb-5">
						{" "}
						<h5
							style={{
								fontWeight: "600",
								color: "rgba(0,0,0,0.7)",
								marginBottom: "300px"
							}}
						>
							{" "}
							You have not posted anything yet{" "}
						</h5>{" "}
					</div>
				) : (
					<div className="recent-condos-container">
						{this.state.userCondominiums.map(condo => (
							<div key={condo.id}>
								<CondoCard
									key={condo.id}
									condo={condo}
									handleDelete={this.handleDelete}
									setModalVisible={this.setModalVisible}
									isModalVisible={this.state.isModalVisible}
									handleEdit={this.props.handleEdit}
								/>
							</div>
						))}
					</div>
				)}
				<ConfirmDeleteModal
					setModalVisible={this.setModalVisible}
					isModalVisible={this.state.isModalVisible}
					handleDelete={this.handleDelete}
					condoId={this.state.condoId}
					deleteLoading={this.state.deleteLoading}
				/>
			</div>
		);
	}
}

export default RecentPosts;
