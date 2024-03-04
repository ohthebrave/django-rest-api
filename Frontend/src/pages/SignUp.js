import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const user = {
        username,
        email,
        password,
        role,
      };

      const response = await axios.post(
        "https://django-rest-api-x6mz.onrender.com/farm/signup/",
        user
      );

      if (response.status === 201) {
        console.log("User signed up successfully:", response.data);
        alert("You Registered Successfully. Sign In To Proceed");
        setIsSignedUp(true);
      } else {
        alert("There was a problem signing in. ");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    if (isSignedUp) {
      setTimeout(() => {
        Navigate("/sign-in");
      }, 50);
    }
  }, [isSignedUp, Navigate]);

  return (
    <>
      {isSignedUp && <Navigate to="/sign-in" />}
      <Header />
      <div className="container d-flex justify-content-center align-items-center vh-90 sign-up-form">
        <div className="container card mt-5 mb-5">
          <h2 className="text-center mt-3">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                required
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="farmer">Farmer</option>{" "}
                <option value="customer">Customer</option>{" "}
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary mt-4 sign-button"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-3 mb-5 text-center">
            Already have an account? <Link to="/sign-in">Sign In</Link> instead
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;


// use this format to do my FarmUpload component