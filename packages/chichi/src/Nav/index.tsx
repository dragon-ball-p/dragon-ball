import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home: React.FC = function () {
  return (
    <nav className="navigator">
      <Link to="/button">Button</Link>
      <Link to="/card">Card</Link>
      <Link to="/input">Input</Link>
      <Link to="/notification">Notification</Link>
      <Link to="/form">Form</Link>
    </nav>
  );
};

export default Home;
