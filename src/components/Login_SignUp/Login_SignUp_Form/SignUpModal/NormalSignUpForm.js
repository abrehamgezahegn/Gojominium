import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import axios from "axios";
import uuid from "uuid";
import owasp from "owasp-password-strength-test";
import "../../Login_Modal.css";

owasp.config({
	allowPassphrases: true,
	maxLength: 128,
	minLength: 10,
	minPhraseLength: 20,
	minOptionalTestsToPass: 3
});

const FormItem = Form.Item;

class NormalSignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			userId: uuid(),
			email: "",
			password: "",
			confirmPassword: "",
			passErrors: [],
			errorMessage: ""
		};
	}

	handleChange = e => {
		const value = e.target.value;
		if (e.target.name === "password") {
			const { errors } = owasp.test(value);
			this.setState({ passErrors: errors });
			if (errors.length === 0) {
				this.setState({ [e.target.name]: value });
			}
		} else if (e.target.name !== "password") {
			this.setState({ [e.target.name]: value });
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log("Received values of form: ", values);
			}
			if (this.state.password !== this.state.confirmPassword) {
				this.setState({ errorMessage: "Passwords do not match" });
			} else if (this.state.passErrors.length === 0) {
				axios({
					method: "post",
					url: "http://localhost:8000/register",
					data: {
						userId: this.state.userId,
						email: this.state.email,
						password: this.state.password
					}
				}).then(res => {
					try {
						if (res.data.status === "registered") {
							const token = res.data.token;
							this.props.grantAccess(token);
							this.props.setUserId();
							this.props.setModal2Visible(false);
						} else if (
							res.data.error.constraint === "users_email_key"
						) {
							this.setState({
								errorMessage: "Email already exists"
							});
						}
					} catch (err) {
						console.log(err);
					}
				});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<p className="text-center" style={{ color: "red" }}>
						{" "}
						{this.state.errorMessage}{" "}
					</p>
					<FormItem>
						{getFieldDecorator("userName", {
							rules: [
								{
									required: true,
									message: "Please input your email adderss!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="mail"
										style={{ color: "rgba(0,0,0,.50)" }}
									/>
								}
								placeholder="Email address"
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please create a new Password!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0,0,0,.50)" }}
									/>
								}
								type="password"
								name="password"
								placeholder="New Password"
								onChange={this.handleChange}
							/>
						)}
						{this.state.passErrors.map(err => (
							<p key={err} className="pass-error-mes">
								{" "}
								{err}{" "}
							</p>
						))}
					</FormItem>
					<FormItem>
						{getFieldDecorator("confirm password", {
							rules: [
								{
									required: true,
									message: "Please confirm your Password!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0,0,0,.50)" }}
									/>
								}
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password"
								onChange={this.handleChange}
							/>
						)}
					</FormItem>
					<FormItem>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Sign up
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const WrappedNormalSignUpForm = Form.create()(NormalSignUpForm);

export default WrappedNormalSignUpForm;
