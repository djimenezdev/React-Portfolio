import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBG: false,
    };
    this.transitionNav = this.transitionNav.bind(this);
  }

  transitionNav() {
    if (window.scrollY < 100) {
      this.setState({ navBG: false });
    } else {
      this.setState({ navBG: true });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.transitionNav);
  }

  componentWillUnmount() {
    return window.removeEventListener("scroll", this.transitionNav);
  }

  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var occupation = this.props.data.occupation;
      var description = this.props.data.description;
      var city = this.props.data.address.city;
      var networks = this.props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url} target="_blank" rel="noreferrer">
              <i className={network.className}></i>
            </a>
          </li>
        );
      });
    }
    return (
      <header id="home">
        <nav id="nav-wrap" className={this.state.navBG ? "opaque" : ""}>
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className={this.props.visibleState === "home" ? "current" : ""}>
              <a href="#home">Home</a>
            </li>
            <li
              className={this.props.visibleState === "about" ? "current" : ""}
            >
              <a href="#about">About</a>
            </li>
            <li
              className={this.props.visibleState === "resume" ? "current" : ""}
            >
              <a href="#resume">Resume</a>
            </li>
            <li
              className={
                this.props.visibleState === "portfolio" ? "current" : ""
              }
            >
              <a href="#portfolio">Works</a>
            </li>
            <li
              className={
                this.props.visibleState === "Testimonials" ? "current" : ""
              }
            >
              <a href="#Testimonials">Testimonials</a>
            </li>

            <li
              className={this.props.visibleState === "contact" ? "current" : ""}
            >
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">I'm {name}.</h1>
            <h3>
              <span className="bannerText__bgS">{`I'm a ${city} based`}</span>
              <span className="bannerText__span">{occupation}.</span>{" "}
              <span className="bannerText__bgS">{description}.</span>
            </h3>
            <hr />
            <ul className="social">{networks}</ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
