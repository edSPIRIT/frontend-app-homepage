import {
  AvatarButton, Button, Dropdown, SearchField,
} from '@edx/paragon';
import classNames from 'classnames';
import React from 'react';
import moodyLogo from '../../../assets/Moody-logo.svg';

const HeaderDashboard = () => {
  const route = window.location.pathname.replace('/', '');
  return (
    <header>
      <div className="d-flex flex-row justify-content-between align-items-center dashboard-header-container">
        <div className="left-side-container">
          <div className="logo-container mr-4">
            <img className="h-100" src={moodyLogo} alt="edspirit-logo" />
          </div>
          <nav>
            <ul className="nav-wrapper">
              <li
                className={classNames({
                  active: route === 'overview',
                })}
              >
                <div className="border-bottom" />
                <a to="/dashboard">Overview</a>
              </li>
              <li
                className={classNames({
                  active: route === 'inProgress',
                })}
              >
                <div className="border-bottom" />
                <a to="/inprogress">In Progress</a>
              </li>
              <li
                className={classNames({
                  active: route === 'completed',
                })}
              >
                <div className="border-bottom" />
                <a to="/completed">Completed</a>
              </li>
              <li
                className={classNames({
                  active: route === 'search' || route === 'discover',
                })}
              >
                <div className="border-bottom" />
                <a to="/search">Discover</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="d-flex">
          <SearchField
            className="search-header"
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder="What do you want to learn?"
          />
          <div className="d-flex align-items-center">
            <Button variant="tertiary" className="mx-1" size="sm">
              Help
            </Button>
          </div>
          <div className="sign-in-container">
            <Dropdown className="ml-4">
              <Dropdown.Toggle showLabel={false} as={AvatarButton} src="" />

              <Dropdown.Menu alignRight>
                <Dropdown.Item href="#/Profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#/Account">Account</Dropdown.Item>
                <Dropdown.Item href="#/Dashboard">Dashboard</Dropdown.Item>
                <Dropdown.Item href="#/OrderHistory">
                  Order History
                </Dropdown.Item>
                <Dropdown.Item href="#/SignOut">Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
