import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import EditForm from "../components/Profile/EditForm/EditForm";
import CondosList from "../components/CondosList/CondosList";
import CondoDetail from "../components/CondoDetail/CondoDetail";
import PageNotFound from "../components/404/PageNotFound";
import NavbarFeatures from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import { MyAuthProvider } from "../contexts/MyAuthProvider";
import jwt from "jsonwebtoken";

const checkAuth = () => {
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

const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			checkAuth() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/" }} />
			)
		}
	/>
);

const AppRouter = () => (
	<div>
		<MyAuthProvider>
			<BrowserRouter>
				<div>
					<NavbarFeatures />
					<Switch>
						<Route path="/" component={Dashboard} exact={true} />
						<AuthRoute path="/profile" component={Profile} />
						<AuthRoute path="/editform" component={EditForm} />
						<Route path="/condos" component={CondosList} />
						<Route
							path="/detail/:condoId"
							component={CondoDetail}
							exact={true}
						/>
						<Route component={PageNotFound} />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		</MyAuthProvider>
	</div>
);

export default AppRouter;
