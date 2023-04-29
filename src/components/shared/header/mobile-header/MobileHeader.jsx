import { getConfig } from '@edx/frontend-platform';
import {
  Icon, IconButton, Nav, Skeleton,
} from '@edx/paragon';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { Search } from '@edx/paragon/icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import edLogo from '../../../../assets/edspirit-logo.png';
import useGetFooters from '../../../../hooks/useGetFooters';
import { ReactComponent as HomeNav } from '../../../../assets/nav-icons/home-nav.svg';
import { ReactComponent as HomeNavColored } from '../../../../assets/nav-icons/home-nav-colored.svg';
import { ReactComponent as DashboardNav } from '../../../../assets/nav-icons/dashboard-nav.svg';
import { ReactComponent as DashboardNavColored } from '../../../../assets/nav-icons/dashboard-nav-colored.svg';
import { ReactComponent as DiscoverNav } from '../../../../assets/nav-icons/discover-nav.svg';
import { ReactComponent as DiscoverdNavColored } from '../../../../assets/nav-icons/discover-nav-colored.svg';
import { ReactComponent as ProfileNav } from '../../../../assets/nav-icons/profile-nav.svg';
import { ReactComponent as ProfileNavColored } from '../../../../assets/nav-icons/profile-nav-colored.svg';
import useHideNavbarOnScroll from '../../../../hooks/utils/useHideNavbarOnScroll';

const MobileHeader = () => {
  const { authenticatedUser } = useContext(AppContext);
  const isNavbarVisible = useHideNavbarOnScroll();
  const [ActiveLink, setActiveLink] = useState(null);
  const { footerData, loading } = useGetFooters();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div className="hidden-top-mobile-header" />
      <div
        className={classNames(' py-1.5 px-4 mobile-header', {
          'd-none': !isNavbarVisible,
        })}
      >
        <div className="logo-container mr-4">
          {loading ? (
            <Skeleton height={32} width={112} className="mb-1" />
          ) : (
            <Link to="/">
              <img
                className="h-100"
                src={footerData?.logo ?? edLogo}
                alt="edspirit-logo"
              />
            </Link>
          )}
        </div>
        <IconButton
          className="mobile-search"
          src={Search}
          iconAs={Icon}
          alt="Search"
        />
      </div>
      <Nav
        variant="pills"
        className="d-flex justify-content-between w-100 mobile-bottom-nav-wrapper"
      >
        <Nav.Item>
          <Nav.Link
            activeClassName="active"
            to="/home"
            as={NavLink}
            className="d-flex flex-column align-items-center"
          >
            <Icon src={ActiveLink === '/home' ? HomeNavColored : HomeNav} />
            <span>Home</span>
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
            <span>Dashboard</span>
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
            <span>Discover</span>
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
            <span>Profile</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default MobileHeader;
