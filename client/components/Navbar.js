import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
    <Link to="/">Home</Link> | <Link to="/profile">Profile</Link>
  </nav>
);

export default Navbar;
