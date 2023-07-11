import { getConfig } from '@edx/frontend-platform';
import {
  Icon, IconButton, Nav, Skeleton,
} from '@edx/paragon';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { Search } from '@edx/paragon/icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import DefaultLogo from '../../../../assets/place-holders/NavLogo-placeholder.svg';
import { ReactComponent as HomeNav } from '../../../../assets/nav-icons/home-nav.svg';
import { ReactComponent as HomeNavColored } from '../../../../assets/nav-icons/home-nav-colored.svg';
import { ReactComponent as DashboardNav } from '../../../../assets/nav-icons/dashboard-nav.svg';
import { ReactComponent as DashboardNavColored } from '../../../../assets/nav-icons/dashboard-nav-colored.svg';
import { ReactComponent as DiscoverNav } from '../../../../assets/nav-icons/discover-nav.svg';
import { ReactComponent as DiscoverdNavColored } from '../../../../assets/nav-icons/discover-nav-colored.svg';
import { ReactComponent as ProfileNav } from '../../../../assets/nav-icons/profile-nav.svg';
import { ReactComponent as ProfileNavColored } from '../../../../assets/nav-icons/profile-nav-colored.svg';
import useHideNavbarOnScroll from '../../../../hooks/utils/useHideNavbarOnScroll';
import { setSearchModal } from '../../../../redux/slice/searchModalSlice';
import useGetConfig from '../../../../hooks/useGetConfig';

const MobileHeader = () => {
  const { authenticatedUser } = useContext(AppContext);
  // const isNavbarVisible = useHideNavbarOnScroll();
  const { headerLogo, loading } = useGetConfig();
  const [ActiveLink, setActiveLink] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div className="hidden-top-mobile-header" />
      <div
        className={classNames(' py-1.5 px-4 mobile-header', {
          'd-none': !true,
        })}
      >
        <div className="logo-container mr-4">
          {loading ? (
            <Skeleton height={32} width={112} className="mb-1" />
          ) : (
            <Link to="/">
              <img src={headerLogo ?? DefaultLogo} alt="edspirit-logo" />
            </Link>
          )}
        </div>
        <IconButton
          className="mobile-search"
          src={Search}
          iconAs={Icon}
          alt="Search"
          onClick={() => dispatch(setSearchModal(true))}
        />
      </div>
      <Nav
        variant="pills"
        className="d-flex justify-content-between w-100 mobile-bottom-nav-wrapper"
      >
        <Nav.Item>
          <Nav.Link
            activeClassName="active"
            exact
            to="/"
            as={NavLink}
            className="d-flex flex-column align-items-center"
          >
            <Icon src={ActiveLink === '/' ? HomeNavColored : HomeNav} />
            <FormattedMessage id="header.nav.home" defaultMessage="Home" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            activeClassName="active"
            to="/overview"
            as={NavLink}
            className="d-flex flex-column align-items-center"
          >
            <Icon
              src={
                ActiveLink === '/overview' ? DashboardNavColored : DashboardNav
              }
            />
            <FormattedMessage
              id="header.nav.dashboard"
              defaultMessage="Dashboard"
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            activeClassName="active"
            to="/discover"
            as={NavLink}
            className="d-flex flex-column align-items-center"
          >
            <Icon
              src={
                ActiveLink === '/discover' ? DiscoverdNavColored : DiscoverNav
              }
            />
            <FormattedMessage
              id="header.nav.discover"
              defaultMessage="Discover"
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="d-flex flex-column align-items-center"
            href={`https://apps.${getConfig().LMS_BASE_URL.replace(
              'https://',
              '',
            )}/profile/u/${authenticatedUser?.username}`}
          >
            <Icon
              src={ActiveLink === '/profile' ? ProfileNavColored : ProfileNav}
            />
            <FormattedMessage
              id="header.dropdownOption.profile"
              defaultMessage="Profile"
            />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default MobileHeader;
