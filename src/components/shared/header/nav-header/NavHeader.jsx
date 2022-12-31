import { getConfig } from '@edx/frontend-platform';
import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const NavHeader = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className="nav-wrapper">
        <li
          className={classNames({
            active: location.pathname === '/overview' || location.pathname === '/dashboard',
          })}
        >
          <div className="border-bottom" />
          <Link to="/dashboard">Overview</Link>
        </li>
        <li
          className={classNames({
            active: location.pathname === '/inprogress',
          })}
        >
          <div className="border-bottom" />
          <Link to="/inprogress">In Progress</Link>
        </li>
        <li
          className={classNames({
            active: location.pathname === '/completed',
          })}
        >
          <div className="border-bottom" />
          <a href="/completed">Completed</a>
        </li>
        <li
          className={classNames({
            active: location.pathname === '/search' || location.pathname === '/discover',
          })}
        >
          <div className="border-bottom" />
          <Link to={`${getConfig().LMS_BASE_URL}/search`}>Discover</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;
