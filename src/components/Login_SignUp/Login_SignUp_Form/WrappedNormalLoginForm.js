import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Spin } from "antd";
import SignUpModal from "./SignUpModal/SignUpModal";
import axios from "axios";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
	constructor() {
		super();
		this.state = {
			modal2Visible: false,
			email: "",
			password: "",
			errorMessage: "",
			isLoading: false
		};
	}

	setModal2Visible = modal2Visible => {
		this.setState({ modal2Visible });
		this.props.setModalVisible(false);
	};

	handleChange = e => {
		const value = e.target.value;
		this.setState({ [e.target.name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log("Received values of form: ", values);
			}
			this.setState({ isLoading: true });
			axios({
				method: "post",
				url: "https://gojominium-api.herokuapp.com/signin",
				data: {
					email: this.state.email,
					password: this.state.password
				}
			}).then(res => {
				if (res) {
					if (res.data !== "wrong credentials") {
						this.setState({
							email: "",
							password: "",
							errorMessage: ""
						});
						const token = res.data.token;
						this.props.grantAccess(token);
						this.props.setUserId();
						this.props.setModalVisible(false);
					} else if (res.data === "wrong credentials") {
						this.setState({
							errorMessage: "Wrong email or password",
							isLoading: false
						});
					}
				}
			});
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
									message: "Please input your email!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="mail"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								placeholder="Eamil address"
								type="email"
								name="email"
								onChange={this.handleChange}
								value={this.state.email}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please input your Password!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								type="password"
								placeholder="Password"
								onChange={this.handleChange}
								name="password"
								value={this.state.password}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("remember", {
							valuePropName: "checked",
							initialValue: true
						})(<Checkbox>Remember me</Checkbox>)}
						<a className="login-form-forgot" href="">
							Forgot password
						</a>
						<Spin spnning={this.state.isLoading}>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								Log in
							</Button>
						</Spin>
						Or{" "}
						<Button onClick={() => this.setModal2Visible(true)}>
							{" "}
							Register now!{" "}
						</Button>
					</FormItem>
				</Form>
				<SignUpModal
					setModal2Visible={this.setModal2Visible}
					modal2Visible={this.state.modal2Visible}
					grantAccess={this.props.grantAccess}
					setUserId={this.props.setUserId}
				/>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
