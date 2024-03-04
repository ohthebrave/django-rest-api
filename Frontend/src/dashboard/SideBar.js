import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";

const SideBar = () => {

  const handleClick = () => {
    console.log('Hello')
    Cookies.remove('access')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Farmat</Navbar.Brand>          
          <Nav>
           <Nav.Link onClick={handleClick} href="/">Home</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar>
    </div>
  )
}

export default SideBar;