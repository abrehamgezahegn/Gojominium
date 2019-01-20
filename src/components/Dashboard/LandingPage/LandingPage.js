import React, { Component } from "react";
import "./LandingPage.css";
import Intro from "./Intro";
import GetStarted from "./GetStarted";

class LandingPage extends Component {
	render() {
		return (
			<div className="d-flex flex-column">
				<div>
					<Intro />
				</div>
				<div>
					<GetStarted />
				</div>
			</div>
		);
	}
}

export default LandingPage;
