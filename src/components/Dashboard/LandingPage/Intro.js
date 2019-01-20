import React, { Component } from "react";
import { Button } from "antd";
import { AuthConsumer } from "../../../contexts/MyAuthProvider";
import { Link } from "react-router-dom";

class Intro extends Component {
	render() {
		return (
			<div className="landing-main-container">
				{" "}
				<div className="landing-header-container d-flex flex-column">
					{" "}
					<p className="landing-header"> ጎጆMinium </p>{" "}
					<p className="landing-header-caption"> Built for you </p>
				</div>{" "}
				<div className="landing-catch-phrase">
					{" "}
					ጎጆMinium is a realstate platform built by the inspiration to
					make apartment sell and rent process real easy.
				</div>{" "}
				<div>
					<AuthConsumer>
						{context => {
							if (context.isAuthed()) {
								return (
									<Link to="/profile">
										<Button className="landing-sign-button">
											{" "}
											Post your apartment
										</Button>
									</Link>
								);
							} else {
								return (
									<Button
										className="landing-sign-button"
										onClick={context.setModalVisible}
									>
										{" "}
										Sign up for free{" "}
									</Button>
								);
							}
						}}
					</AuthConsumer>
				</div>
			</div>
		);
	}
}

export default Intro;
