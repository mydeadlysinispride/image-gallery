import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import {ReactComponent as Logo} from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: 'lightblue',
  color: 'black', 
  padding: '10px 0',
  textAlign: 'center'
}
const Header = ({title}) => {
  return (
    <Navbar style={navbarStyle} variant="dark">
      <Container>
        <Logo alt={title} style={{ maxWidth: '15rem', maxHeight: '2rem', marginLeft: '-200px' }}/>
      </Container>
    </Navbar>
  );
}

export default Header;