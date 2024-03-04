import "../cssModules/Contact.css";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container contact-us">
        <div className="row mt-5">
          <div className="col">
            <h2 className="text-center">Contact Us</h2>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-md-6">
            <h3>Office Address</h3>
            <p>
              <i className="bi bi-building"></i> Block 001 - Farmart Ranch
            </p>
            <p>
              <i className="bi bi-door-open"></i> Open All week 8am - 5pm
            </p>
          </div>
          <div className="col-md-6">
            <h3>Talk To Us</h3>
            <p>
              <i className="bi bi-envelope"></i> info@farmart.co.ke
            </p>
            <p>
              <i className="bi bi-telephone-inbound"></i>+ 123 123 456 789
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h3>Leave a Message</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-4 mb-4 sign-button"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
