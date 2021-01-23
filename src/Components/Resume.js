import React, { Component } from "react";

class Resume extends Component {
  render() {
    var work = this.props.data?.work.map(function (work) {
      return (
        <div key={Math.random() * 2000}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          <p>{work.description}</p>
        </div>
      );
    });
    let skillsM = this.props.data?.skills.map(function (skills) {
      return (
        <div key={Math.random() * 2000} className="data__skillsContainer">
          {skills.name ? (
            <div>
              <h2 className="data__skillsTitle">{skills.name}</h2>
              <img className="data__skillsImage" src={skills.image} alt="" />
            </div>
          ) : (
            <img className="data__skillsImage" src={skills.image} alt="" />
          )}
        </div>
      );
    });

    return (
      <section id="resume">
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>

        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="data__skills">{skillsM}</div>
            {/*  <div className="bars">
              <ul className="skills">{skills}</ul>
            </div> */}
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
