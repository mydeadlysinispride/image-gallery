import React from 'react';
import { Navbar, Container } from 'react-bootstrap';


const Header = (props) => {
  const { title } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;