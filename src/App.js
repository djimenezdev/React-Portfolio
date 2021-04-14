import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Testimonials from "./Components/Testimonials";
import Portfolio from "./Components/Portfolio";
import ReactVisibilitySensor from "react-visibility-sensor";
const App = (props) => {
  const [visible, setVisible] = useState("home");
  const [resumeData, setResumeData] = useState({});
  /*  constructor(props) {
    super(props);
    this.state = {
      visible: "home",
      resumeData: {},
    };
  } */

  const getResumeData = () => {
    axios
      .get("/resumeData.json")
      .then((response) => {
        setResumeData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    if (!resumeData?.portfolio?.projects) {
      getResumeData();
    }
  }, [resumeData]);

  return (
    <div className="App">
      <ReactVisibilitySensor
        delayedCall
        partialVisibility="top"
        onChange={(isVisible) => isVisible && setVisible("home")}
      >
        <Header data={resumeData.main} visibleState={visible} />
      </ReactVisibilitySensor>

      <ReactVisibilitySensor
        onChange={(isVisible) => isVisible && setVisible("about")}
      >
        <About data={resumeData.main} />
      </ReactVisibilitySensor>

      <ReactVisibilitySensor
        partialVisibility="top"
        minTopValue={300}
        onChange={(isVisible) => isVisible && setVisible("resume")}
      >
        <Resume data={resumeData.resume} />
      </ReactVisibilitySensor>

      <Portfolio
        partialVisibility="bottom"
        data={resumeData?.portfolio?.projects}
        updateVis={() => setVisible("portfolio")}
      />

      <ReactVisibilitySensor
        onChange={(isVisible) => isVisible && setVisible("Testimonials")}
      >
        <Testimonials
          data={resumeData.testimonials?.clients}
          title="Testimonials"
        />
      </ReactVisibilitySensor>
      <ReactVisibilitySensor
        partialVisibility="top"
        minTopValue={15}
        onChange={(isVisible) => isVisible && setVisible("contact")}
      >
        <Contact data={resumeData.main} />
      </ReactVisibilitySensor>

      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;
