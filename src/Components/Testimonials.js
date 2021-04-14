import React, { Component } from "react";
import Carousel from "react-material-ui-carousel";
class Testimonials extends Component {
  render() {
    return (
      <section id={this.props.title}>
        <div className="text-container">
          <div className="row">
            <h1>{this.props.title}</h1>
            <div className="ten columns flex-container">
              <ul className="slides">
                <Carousel
                  navButtonsAlwaysInvisible={true}
                  indicators={false}
                  animation="fade"
                  autoPlay
                  interval={10000}
                >
                  {this.props.data?.map(function (testimonials) {
                    return (
                      <li key={testimonials.user}>
                        <blockquote>
                          <p>{testimonials.text}</p>
                          <cite>{testimonials.user}</cite>
                        </blockquote>
                      </li>
                    );
                  })}
                </Carousel>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimonials;
