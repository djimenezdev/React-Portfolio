import React, { useEffect, useState } from "react";
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
import { reactGoogleAnalytics } from "./config/firebase";

const App = (props) => {
  const [visible, setVisible] = useState("home");
  const [resumeData, setResumeData] = useState({});

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

  // initializes google analytics
  // this allows for you to see how many people load your portfolio, allows for you to see how users engage with your application,  etc
  reactGoogleAnalytics.setCurrentScreen(window.location.pathname);
  reactGoogleAnalytics.logEvent("screen_view");

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
        partialVisibility="top"
        minTopValue={150}
      >
        <Testimonials
          data={resumeData.testimonials?.clients}
          title="Testimonials"
        />
      </ReactVisibilitySensor>
      <ReactVisibilitySensor
        partialVisibility="top"
        minTopValue={400}
        onChange={(isVisible) => isVisible && setVisible("contact")}
      >
        <Contact data={resumeData.main} />
      </ReactVisibilitySensor>

      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;
