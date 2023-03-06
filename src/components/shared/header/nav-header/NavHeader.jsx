import React from 'react';
import { NavLink } from 'react-router-dom';

const NavHeader = () => (
  <nav>
    <ul className="nav-wrapper">
      <NavLink to="/overview" activeClassName="active">
        <div className="border-bottom" />
        <li>Overview</li>
      </NavLink>
      <NavLink to="/inprogress" activeClassName="active">
        <li>
          <div className="border-bottom" />
          In Progress
        </li>
      </NavLink>
      <NavLink to="/completed" activeClassName="active">
        <li>
          <div className="border-bottom" />
          Completed
        </li>
      </NavLink>
      <NavLink exact to="/discover" activeClassName="active">
        <li>
          <div className="border-bottom" />
          Discover
        </li>
      </NavLink>
    </ul>
  </nav>
);

export default NavHeader;
