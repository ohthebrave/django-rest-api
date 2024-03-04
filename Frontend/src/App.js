import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./components/Contact"
import About from "./components/About"
import AnimalList from "./components/AnimalList"
import Cart from "./pages/Cart";
import Logout from "./pages/Logout";
import Checkout from "./components/Checkout";
import Dashboard from "./dashboard/Dashboard";
import TrackOrders from "./dashboard/TrackOrders";
import Patch from "./dashboard/Patch";
import Details from "./dashboard/Details";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/animal-list" element={<AnimalList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:id/patch" element={<Patch />} />
          <Route path="/:id/" element={<Details />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/trackorders" element={<TrackOrders />} />
          <Route path="/farm-upload" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
