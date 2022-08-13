// import React, { Component } from 'react';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Button from './Button';
import Card from './Card';
// import Notification from './Notification';
import Input from './Input';
// import Form from './Form';
export default function (): React.ReactElement {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/button" element={<Button />}></Route>
        <Route path="/card" element={<Card />}></Route>
        {/* <Route path="/notification" element={<Notification />}></Route> */}
        <Route path="/input" element={<Input />}></Route>
        {/* <Route path="/form" element={<Form />}></Route> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
function NoMatch(): React.ReactElement {
  return (
    <div>
      <h2>404!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
