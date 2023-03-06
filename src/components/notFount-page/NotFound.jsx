import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="d-flex py-6 align-items-center justify-content-center flex-column vh-100">
    <h1>Oops! You seem to be lost.</h1>
    <Link to="/">Home</Link>
  </div>
);

export default NotFound;
