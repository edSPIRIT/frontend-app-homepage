import React from 'react';
import { NavLink } from 'react-router-dom';

const NavHeader = () => (
  <nav>
    <ul className="nav-wrapper">
      <li>
        <div className="border-bottom" />
        <NavLink to="/overview" activeClassName="active">
          <div className="border-bottom" />
          Overview
        </NavLink>
      </li>
      <li>
        <div className="border-bottom" />
        <NavLink to="/inprogress" activeClassName="active">
          <div className="border-bottom" />
          In Progress
        </NavLink>
      </li>
      <li>
        <div className="border-bottom" />
        <NavLink to="/completed" activeClassName="active">
          <div className="border-bottom" />
          Completed
        </NavLink>
      </li>
      <li>
        <div className="border-bottom" />
        <NavLink to="/search" activeClassName="active">
          <div className="border-bottom" />
          Discover
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavHeader;
