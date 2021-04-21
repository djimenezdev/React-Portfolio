import React, { useReducer, useState } from "react";

const Contact = ({ data }) => {
  const [success, setSuccess] = useState("");

  const formReducer = (state, action) => {
    switch (action.type) {
      case "email":
        return {
          formStates: [
            action.emailInput,
            state.formStates[1],
            state.formStates[2],
          ],
        };
      case "subject":
        return {
          formStates: [
            state.formStates[0],
            action.subjectInput,
            state.formStates[2],
          ],
        };
      case "message":
        return {
          formStates: [
            state.formStates[0],
            state.formStates[1],
            action.messageInput,
          ],
        };
      default:
        throw new Error();
    }
  };

  const [formInfo, dispatch] = useReducer(formReducer, {
    formStates: ["", "", ""],
  });

  // initialize EmailJS

  const handleClick = (e) => {
    if (
      formInfo.formStates[0].length === 0 ||
      formInfo.formStates[1].length === 0 ||
      formInfo.formStates[2].length === 0
    ) {
      setSuccess(false);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      // displays success message
      setSuccess(true);

      // removes success message after a few seconds
      setTimeout(() => {
        setSuccess("");
      }, 8000);
    }
  };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{data?.message}</p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form
            action="https://formsubmit.co/djimenez0255@gmail.com"
            id="contactForm"
            name="contactForm"
            method="POST"
          >
            <fieldset>
              <input type="hidden" name="_next" value={window.location.href} />
              <input type="hidden" name="_template" value="box" />
              <div>
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  value={formInfo.formStates[0]}
                  placeholder="Enter Email Here"
                  type="email"
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={(e) =>
                    dispatch({ type: "email", emailInput: e.target.value })
                  }
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input
                  value={formInfo.formStates[1]}
                  placeholder="Enter what email is about here(topic)"
                  type="text"
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  onChange={(e) =>
                    dispatch({ type: "subject", subjectInput: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  value={formInfo.formStates[2]}
                  placeholder="Enter details about said subject here"
                  onChange={(e) =>
                    dispatch({ type: "message", messageInput: e.target.value })
                  }
                  cols="50"
                  rows="15"
                  id="contactMessage"
                  name="contactMessage"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  disabled={
                    formInfo.formStates[0].length === 0 &&
                    formInfo.formStates[1].length === 0 &&
                    formInfo.formStates[2].length === 0
                  }
                  type="submit"
                  onClick={handleClick}
                  className="submit"
                >
                  Submit
                </button>
                <span id="image-loader">
                  <img alt="" src="images/loader.gif" />
                </span>
              </div>
            </fieldset>
          </form>

          <div>
            {success ? (
              <div
                style={{
                  color: " #11abb0",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                }}
              >
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            ) : success === false ? (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                }}
              >
                <i class="fa fa-times"></i>Your Message was not sent, make sure
                to fill out all fields
              </div>
            ) : null}
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {data?.name}
              <br />
              {data?.email}
              <br />
              <span>{data?.phone}</span>
            </p>
          </div>

          <div className="widget widget_tweets"></div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
