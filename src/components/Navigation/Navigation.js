import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "mdbreact";
import { NavLink } from "react-router-dom";
import { Fa } from "mdbreact";
import "./Nav.css";
import LoginModal from "../Login_SignUp/LoginModal";
import { AuthConsumer } from "../../contexts/MyAuthProvider";

class NavbarFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.collapse === true) {
      this.setState({ collapse: false });
    } else {
      this.setState({ collapse: true });
    }
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
            <NavLink to="/">
              {" "}
              <h1 className="logo-letter" onClick={this.onClick}>
                {" "}
                ጎጆ{" "}
              </h1>{" "}
            </NavLink>
          </NavbarBrand>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className="nav-item">
                <NavLink
                  to="/"
                  activeClassName="is-active"
                  exact={true}
                  onClick={this.onClick}
                  className="nav-item-text"
                >
                  HOME
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  to="/condos"
                  activeClassName="is-active"
                  onClick={this.onClick}
                  className="nav-item-text"
                >
                  {" "}
                  APARTMENTS{" "}
                </NavLink>
              </NavItem>
              <NavItem
                className="nav-item "
                onClick={this.scrollToBottom}
                activeClassName="is-active"
                className="nav-item-text"
              >
                {" "}
                <p className="contact-us" onClick={this.onClick}>
                  CONTACT US{" "}
                </p>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <AuthConsumer>
                {(context) => {
                  if (context.isAuthed()) {
                    return (
                      <NavItem className="nav-item ">
                        <NavLink
                          to="/profile"
                          className="d-flex"
                          activeClassName="is-active"
                        >
                          <div className="profile" onClick={this.onClick}>
                            <Fa icon="user" className="user-icon" /> POST
                          </div>
                        </NavLink>
                      </NavItem>
                    );
                  } else {
                    return (
                      <p className="please-login"> Please login to post</p>
                    );
                  }
                }}
              </AuthConsumer>

              <NavItem>
                <AuthConsumer>
                  {(context) => {
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
