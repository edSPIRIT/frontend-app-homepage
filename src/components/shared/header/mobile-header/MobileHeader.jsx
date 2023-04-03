import { getConfig } from '@edx/frontend-platform';
import {
  Avatar,
  Button,
  Collapsible,
  FullscreenModal,
  Icon,
  IconButton,
} from '@edx/paragon';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '@edx/frontend-platform/react';
import {
  Close,
  Menu,
  Search,
  ArrowForward,
  ArrowForwardIos,
} from '@edx/paragon/icons';
import { Link, NavLink, useHistory } from 'react-router-dom';
import moodyLogo from '../../../../assets/Moody-logo.svg';
import useGetSubjects from '../../../../hooks/useGetSubjects';

const MobileHeader = ({ isOpen: isOpenMenu, close: closeMenu, openMenu }) => {
  const { authenticatedUser } = useContext(AppContext);
  // const [isOpen, open, close] = useToggle(false);
  const { subjects, coursesCounter } = useGetSubjects();
  const history = useHistory();

  return (
    <>
      <div className="py-3 d-flex justify-content-around align-items-center mobile-header">
        <IconButton src={Menu} iconAs={Icon} alt="Menu" onClick={openMenu} />
        <div className="logo-container mr-4">
          <Link to="/">
            <img className="h-100" src={moodyLogo} alt="edspirit-logo" />
          </Link>
        </div>
        <IconButton src={Search} iconAs={Icon} alt="Search" />
      </div>
      <FullscreenModal
        hasCloseButton={false}
        beforeBodyNode={(
          <div className="d-flex justify-content-between align-items-center py-3.5 px-4">
            <div className="logo-container mr-4">
              <Link to="/" onClick={closeMenu}>
                <img className="h-100" src={moodyLogo} alt="edspirit-logo" />
              </Link>
            </div>
            <IconButton
              src={Close}
              iconAs={Icon}
              alt="Close"
              onClick={closeMenu}
            />
          </div>
        )}
        isOpen={isOpenMenu}
        onClose={closeMenu}
        className="mobile-menu-modal"
      >
        <div className="d-flex py-3.5 px-4 btn-wrapper justify-content-center">
          {authenticatedUser ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                window.location.href = `https://apps.${getConfig().LMS_BASE_URL.replace(
                  'https://',
                  '',
                )}/profile/u/${authenticatedUser?.username}`;
              }}
            >
              <Avatar className="mr-3 flex-shrink-0" size="sm" />
              <span className="email-title mr-1">
                {authenticatedUser?.email}
              </span>
              <Icon
                className="ml-1 icon-forward"
                src={ArrowForwardIos}
                href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                  'https://',
                  '',
                )}/profile/u/${authenticatedUser?.username}`}
              />
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
        // <div className="nav-wrapper ">
          <div className="d-flex flex-column">
            <ul className="mobile-nav-items">
              <li className="mb-2.5 py-2">
                <NavLink
                  to="/overview"
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  Overview
                </NavLink>
              </li>
              <li className="mb-2.5 py-2">
                <NavLink
                  to="/inprogress"
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  In Progress
                </NavLink>
              </li>
              <li className="mb-2.5 py-2">
                <NavLink
                  to="/completed"
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  Completed
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  to="/discover"
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  Discover
                </NavLink>
              </li>
            </ul>
            <a
              href={`${getConfig().LMS_BASE_URL}/logout`}
              className="py-2 sign-out"
            >
              Sign Out
            </a>
          </div>
        // </div>
        ) : (
          <ul className="mobile-nav-items">
            <li className="mb-2.5">
              <Collapsible styling="basic" title={<span>Subjects</span>}>
                <ul className="subject-items">
                  {subjects?.map((subject) => (
                    <li key={subject.slug}>
                      <a className="custom-link" href="/learn/architecture">
                        {subject.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="d-flex flex-column mt-1 py-2.5">
                  <div className="mb-2.5 d-flex justify-content-center">
                    <span className="text-gray-500  mr-1 ">Total Course:</span>
                    <span className="font-weight-bold">{coursesCounter}</span>
                  </div>
                  <Button
                    variant="outline-primary"
                    iconAfter={ArrowForward}
                    className="mb-2 mb-sm-0"
                    onClick={() => {
                      closeMenu();
                      history.push('/discover');
                    }}
                  >
                    View All Courses
                  </Button>
                </div>
              </Collapsible>
            </li>
            {/* <li className="mb-2.5">
              <Collapsible styling="basic" title={<span>Programs</span>}>
                <p>Your stuff goes here.</p>
              </Collapsible>
            </li> */}
            <li className="py-2 mb-2.5">
              <span>Partners</span>
            </li>
            <li className="py-2">
              <span>Help</span>
            </li>
          </ul>
        )}
        {/* <a
          href={`${getConfig().LMS_BASE_URL}/logout`}
          className="py-2 sign-out"
        >
          Sign Out
        </a> */}
      </FullscreenModal>
      {/* <ModalLayer isOpen={isOpen} onClose={close}>
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
      </ModalLayer> */}
    </>
  );
};
MobileHeader.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.bool,
  openMenu: PropTypes.bool,
};
MobileHeader.defaultProps = {
  isOpen: false,
  close: false,
  openMenu: false,
};

export default MobileHeader;
