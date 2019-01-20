import React from "react";
import "./Footer.css";
import { Fa } from "mdbreact";
import { Button } from "antd";
import { AuthConsumer } from "../../contexts/MyAuthProvider";
import { Link } from "react-router-dom";

const Footer = () => (
	<div>
		<div className="footer-main-container">
			<div className="footer-logo">
				{" "}
				<div className="d-flex flex-row">
					<p className="footer-logo-text"> ጎጆ </p>{" "}
					<p className="footer-logo-minium"> Minium </p>
				</div>
			</div>
			<div className=" footer-nav">
				<h4 className="footer-header mb-3"> Gojominium </h4>
				<Link to="/">
					{" "}
					<h6 className="footer-nav-item grow"> Home </h6>{" "}
				</Link>
				<Link to="/condos">
					<h6 className="footer-nav-item grow"> Apartments </h6>{" "}
				</Link>
			</div>
			<div className="footer-contact">
				<h4 className="footer-header mb-3"> Contact us </h4>
				<Fa
					icon="facebook"
					size="lg"
					className="mr-4 footer-facebook"
				/>
				<a href="https://twitter.com/AbrehamGezaheg1" target="blank">
					<Fa
						icon="twitter"
						size="lg"
						className="mr-4 footer-twitter"
					/>
				</a>
				<a href="https://twitter.com/AbrehamGezaheg1" target="blank">
					<Fa
						icon="instagram"
						size="lg"
						className="mr-4 footer-instgram"
					/>
				</a>
				<div className="d-flex flex-row mt-1 ">
					<Fa
						icon="fas fa-envelope-square footer-email-icon"
						size="lg"
						className="mr-2 mt-2"
					/>
					<p className="mt-1 ml-2 footer-email">
						{" "}
						gezahegnabereham@gmail.com{" "}
					</p>
				</div>
				<div className="d-flex flex-row">
					<Fa icon="fas fa-phone" size="lg" className="mr-2 mt-2" />
					<p className="mt-1 ml-2"> 0913616046 </p>
				</div>
			</div>
			<div className="footer-signup">
				<AuthConsumer>
					{context => {
						if (context.isAuthed()) {
							return (
								<div>
									<p> Sign up to post your condominum. </p>
									<Button onClick={context.denieAccess}>
										{" "}
										Logout{" "}
									</Button>
								</div>
							);
						} else {
							return (
								<Button
									className="signup-button"
									onClick={() => {
										context.setModalVisible(true);
									}}
								>
									{" "}
									Log in or Sign up{" "}
								</Button>
							);
						}
					}}
				</AuthConsumer>
			</div>
		</div>
		<div className="footer-bottom text-center">
			<p style={{ marginBottom: "8px" }}>
				© Copyright reserved Gojominium{" "}
			</p>
		</div>
	</div>
);

export default Footer;
