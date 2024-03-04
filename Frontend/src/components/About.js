import "../cssModules/About.css"
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const About = () => {
  return (
    <div className="about-header">
      <Header />
      <div className="container about">
        <div className="row mt-5">
          <div className="col">
            <h2 className="text-center">About Us</h2>
            <p className="text-center">We are dedicated to revolutionizing the agricultural industry by empowering farmers to directly sell their farm animals, eliminating the need for middlemen and ensuring fair profits.</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h3>Our Mission</h3>
            <p>Our mission is to eradicate middlemen from the agricultural supply chain, providing a platform for farmers to connect directly with distributors and consumers, and to promote transparency and fairness in the agricultural trade.</p>
          </div>
          <div className="col-md-6">
            <h3>Our Vision</h3>
            <p>Our vision is to create a sustainable and equitable agricultural ecosystem where farmers receive the full value for their hard work, and consumers have access to high-quality farm animals directly from the source.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;