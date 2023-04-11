/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getConfig } from '@edx/frontend-platform';
import {
  Avatar,
  Button,
  FullscreenModal,
  Icon,
  IconButton,
  SearchField,
  useMediaQuery,
  useToggle,
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
  ArrowBack,
} from '@edx/paragon/icons';
import { Link, NavLink, useHistory } from 'react-router-dom';
import moodyLogo from '../../../../assets/Moody-logo.svg';
import useGetSubjects from '../../../../hooks/useGetSubjects';

const MobileHeader = ({ isOpen: isOpenMenu, close: closeMenu, openMenu }) => {
  const { authenticatedUser } = useContext(AppContext);
  const [isOpen, open, close] = useToggle(false);
  const { subjects, coursesCounter } = useGetSubjects();
  const history = useHistory();
  const isTablet = useMediaQuery({
    minWidth: '768px',
    maxWidth: '1024px',
  });
  return (
    <>
      <div className="py-3 d-flex justify-content-between align-items-center mobile-header px-4 ">
        <IconButton
          src={Menu}
          iconAs={Icon}
          alt="Menu"
          onClick={openMenu}
          className=""
        />
        <div className="logo-container">
          <Link to="/">
            <img className="h-100" src={moodyLogo} alt="edspirit-logo" />
          </Link>
        </div>
        {isTablet ? (
          <SearchField
            onSubmit={() => history.push('/search')}
            placeholder="What do you want to learn?"
            className="tablet-search "
          />
        ) : (
          <IconButton src={Search} iconAs={Icon} alt="Search" />
        )}
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
              <h5 className="email-title mr-1">
                {authenticatedUser?.email}
              </h5>
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
          <div className="d-flex flex-column justify-content-between h-100">
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
              className="py-2 sign-out my-2.5 mx-4 color-brand-600"
            >
              Sign Out
            </a>
          </div>
        ) : (
          <ul className="mobile-nav-items">
            <li className="mb-2.5">
              <div className="d-flex justify-content-between py-2" onClick={open}>
                <span className="mr-1">Subjects</span>
                <Icon
                  className="ml-1 icon-forward"
                  src={ArrowForwardIos}
                  href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                    'https://',
                    '',
                  )}/profile/u/${authenticatedUser?.username}`}
                />
              </div>
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

      </FullscreenModal>
      <FullscreenModal
        title="My dialog"
        isOpen={isOpen}
        onClose={close}
        className="subject-modal"
      >
        <div className="subject-header-wrapper">

          <div className="d-flex py-3 my-1.5 mx-3 ">
            <Icon src={ArrowBack} onClick={close} className="mr-1.5" />
            <h4 className="ml-3.5"> Subjects</h4>
          </div>
        </div>
        <div className=" p-4">
          <ul className="subject-items">
            {subjects?.map((subject) => (
              <li key={subject.slug}>
                <Link
                  className="custom-link"
                  to="/discover"
                  onClick={() => {
                    close();
                    closeMenu();
                  }}
                >
                  {subject.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column py-2.5">
            <div className="mb-2.5 d-flex justify-content-center">
              <span className="text-gray-500  mr-1 font-sm">Total Course:</span>
              <span className="font-weight-bold font-sm">{coursesCounter}</span>
            </div>
            <Button
              variant="outline-primary"
              iconAfter={ArrowForward}
              className="mb-2 mb-sm-0"
              onClick={() => {
                close();
                closeMenu();
                history.push('/discover');
              }}
            >
              View All Courses
            </Button>
          </div>
        </div>

      </FullscreenModal>
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
