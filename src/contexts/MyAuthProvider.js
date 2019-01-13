import React, { Component } from "react";
import jwt from "jsonwebtoken";

export const {
	Provider: AuthProvider,
	Consumer: AuthConsumer
} = React.createContext();

export class MyAuthProvider extends Component {
	state = {
		isModalVisible: false,
		userId: ""
	};

	setModalVisible = isModalVisible => {
		this.setState({ isModalVisible });
	};

	grantAccess = token => {
		this.setState({ isAuthed: true });
		localStorage.setItem("token", token);
	};

	denieAccess = () => {
		this.setState({ isAuthed: false });
		localStorage.removeItem("token");
		window.location.reload();
	};

	isAuthed = () => {
		const token = localStorage.getItem("token");

		if (!token) {
			return false;
		}

		try {
			const { exp } = jwt.decode(token);

			if (exp < new Date().getTime() / 1000) {
				return false;
			}
		} catch (err) {
			return false;
		}

		return true;
	};

	setUserId = () => {
		const token = localStorage.getItem("token");
		const { userId } = jwt.decode(token);

		this.setState({ userId });
	};

	render() {
		return (
			<AuthProvider
				value={{
					isModalVisible: this.state.isModalVisible,
					setModalVisible: this.setModalVisible,
					isAuthed: this.isAuthed,
					grantAccess: this.grantAccess,
					denieAccess: this.denieAccess,
					setUserId: this.setUserId,
					userId: this.state.userId
				}}
			>
				{this.props.children}
			</AuthProvider>
		);
	}
}
