import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink
} from "mdbreact";
import { Fa } from "mdbreact";
import "./Nav.css";
import gojominium from "./logo/gojominium logo.PNG";
import LoginModal from "../Login_SignUp/LoginModal";
import { AuthConsumer } from "../../contexts/MyAuthProvider";

class NavbarFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  render() {
    return (
      <div>
        <Navbar
          dark
          expand="sm"
          scrolling
          className="nav-bar special-color-dark"
          fixed="top"
          scrollingNavbarOffset={20}
        >
          <NavbarBrand>
            <h1 className="logo-letter"> ጎ </h1>
          </NavbarBrand>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className="nav-item">
                <NavLink to="/" activeClassName="is-active" exact={true}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/condos" activeClassName="is-active">
                  {" "}
                  Condominiums{" "}
                </NavLink>
              </NavItem>
              <NavItem
                className="nav-item "
                onClick={this.scrollToBottom}
                activeClassName="is-active"
              >
                {" "}
                <p className="contact-us">Contact us </p>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <AuthConsumer>
                {context => {
                  if (context.isAuthed()) {
                    return (
                      <NavItem className="nav-item ">
                        <NavLink
                          to="/profile"
                          className="d-flex"
                          activeClassName="is-active"
                        >
                          <div className="profile">
                            <Fa icon="user" className="user-icon" /> Post
                          </div>
                        </NavLink>
                      </NavItem>
                    );
                  } else {
                    return (
                      <p className="please-login"> Please login to post </p>
                    );
                  }
                }}
              </AuthConsumer>

              <NavItem>
                <AuthConsumer>
                  {context => {
                    if (context.isAuthed()) {
                      return (
                        <div
                          className="d-flex flex-row login-logout"
                          onClick={() => context.denieAccess()}
                        >
                          {" "}
                          <p style={{ marginBottom: "0px" }}> Logout </p>{" "}
                          <Fa icon="sign-in" className="sign-in-icon" />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="d-flex flex-row login-logout"
                          onClick={() => context.setModalVisible(true)}
                        >
                          {" "}
                          <p style={{ marginBottom: "0px" }}> Login </p>{" "}
                          <Fa icon="sign-in" className="sign-in-icon" />
                        </div>
                      );
                    }
                  }}
                </AuthConsumer>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        <LoginModal />
      </div>
    );
  }
}

export default NavbarFeatures;
