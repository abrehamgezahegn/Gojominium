import React, { Component } from "react";
import "./pageNotFound.css";
import { Fa } from "mdbreact";
import { Button } from "antd";
import { Link } from "react-router-dom";

class PageNotFound extends Component {
	render() {
		return (
			<div className="four-main">
				<div className="d-flex flex-row">
					<p className="four-message"> 404, Page Not Found </p>
					<Fa icon="fas fa-exclamation" size="4x" />
				</div>
				<Link to="/">
					<Button className="four-btn"> Go Back To Safety </Button>
				</Link>
			</div>
		);
	}
}

export default PageNotFound;
