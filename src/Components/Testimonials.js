import React, { Component } from "react";

class Testimonials extends Component {
  render() {
    return (
      <section id={this.props.title}>
        <div className="text-container">
          <div className="row">
            <h1>{this.props.title}</h1>
            <div className="ten columns flex-container">
              <ul className="slides">
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
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimonials;
