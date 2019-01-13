import React, { Component } from "react";
import "./Profile.css";
import RecentPosts from "./RecentPosts/RecentPosts";
import AddForm2 from "./AddForm/AddForm2";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			userId: ""
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div>
				<RecentPosts />
				<AddForm2
					historyPush={() => {
						this.props.history.push("/condos");
					}}
				/>
			</div>
		);
	}
}

export default Profile;
