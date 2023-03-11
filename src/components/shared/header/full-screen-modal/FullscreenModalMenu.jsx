import { getConfig } from '@edx/frontend-platform';
import {
  Avatar,
  Button,
  Collapsible,
  FullscreenModal,
  Icon,
  ModalLayer,
  useToggle,
} from '@edx/paragon';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '@edx/frontend-platform/react';
import { MoreVert } from '@edx/paragon/icons';
import { NavLink } from 'react-router-dom';

const FullscreenModalMenu = ({ isOpen: isOp, close: cl }) => {
  const { authenticatedUser } = useContext(AppContext);
  const [isOpen, open, close] = useToggle(false);

  return (
    <>
      <FullscreenModal
        title="My dialog"
        isOpen={isOp}
        onClose={cl}
        className="mobile-menu-modal"
      >
        <div className="d-flex py-3.5 px-4 btn-wrapper justify-content-center">
          {authenticatedUser ? (
            <div className="d-flex justify-content-center align-items-center">
              <Avatar className="mr-3 flex-shrink-0" size="sm" />
              <span>{authenticatedUser?.email}</span>
              <Icon className="ml-1" src={MoreVert} onClick={open} />
            </div>
          ) : (
            <>
              <Button
                variant="tertiary"
                className="mx-1 mr-3.5"
                size="sm"
                href={`${getConfig().LOGIN_URL}`}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                href={`${getConfig().LMS_BASE_URL}/register`}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {authenticatedUser ? (
          <ul className="nav-items">
            <li className="mb-2.5">
              <NavLink to="/overview" activeClassName="active">
                Overview
              </NavLink>
            </li>
            <li className="mb-2.5">
              <NavLink to="/inprogress" activeClassName="active">
                In Progress
              </NavLink>
            </li>
            <li className="mb-2.5">
              <NavLink to="/completed" activeClassName="active">
                Completed
              </NavLink>
            </li>
            <li>
              <NavLink to="/discover" activeClassName="active">
                Discover
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="mb-2.5">
              <Collapsible styling="basic" title={<span>Subjects</span>}>
                <p>Your stuff goes here.</p>
              </Collapsible>
            </li>
            <li className="mb-2.5">
              <Collapsible styling="basic" title={<span>Programs</span>}>
                <p>Your stuff goes here.</p>
              </Collapsible>
            </li>
            <li className="py-2 mb-2.5">
              <span>Partners</span>
            </li>
            <li className="py-2">
              <span>Help</span>
            </li>
          </ul>
        )}
      </FullscreenModal>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div
          role="dialog"
          aria-label="My dialog"
          className="  bg-white more-modal-items "
        >
          <ul>
            <li className="py-3.5 px-4 color-black">
              <p className="py-2">Dashboard</p>
            </li>
            <li className="py-3.5 px-4">
              <a
                href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                  'https://',
                  '',
                )}/profile/u/${authenticatedUser?.username}`}
                className="py-2"
              >
                Profile
              </a>
            </li>
            <li className="py-3.5 px-4">
              <a
                href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                  'https://',
                  '',
                )}/account`}
                className="py-2"
              >
                Account
              </a>
            </li>
            <li className="py-3.5 px-4 ">
              <a
                href={`${getConfig().LMS_BASE_URL}/logout`}
                className="py-2 sign-out"
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </ModalLayer>
    </>
  );
};
FullscreenModalMenu.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.bool,
};
FullscreenModalMenu.defaultProps = {
  isOpen: false,
  close: false,
};

export default FullscreenModalMenu;
