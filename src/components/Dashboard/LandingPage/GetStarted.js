import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

class Intro extends Component {
	render() {
		return (
			<div className="landing-main-container get-started-main">
				{" "}
				<div className="landing-header-container d-flex flex-column">
					{" "}
					<p className="landing-header get-started-header ">
						{" "}
						It's for all!!
					</p>{" "}
				</div>{" "}
				<div className="landing-catch-phrase get-started-phrase">
					{" "}
					Whether you are seeking for you next home or a broker
					finding a deal ጎጆMinium is the right place for you.
				</div>{" "}
				<div className="d-flex flex-column align-items-center">
					<Link to="/condos">
						<Button className="landing-sign-button get-started-btn">
							{" "}
							Find yours now!{" "}
						</Button>
					</Link>
					<p
						style={{
							marginTop: "2px",
							fontWeight: 700,
							color: "rgba(0,0,0,0.6)"
						}}
					>
						{" "}
						Search through{" "}
					</p>
				</div>
			</div>
		);
	}
}

export default Intro;
