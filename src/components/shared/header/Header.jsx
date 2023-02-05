import {
  AvatarButton,
  Button,
  Dropdown,
  SearchField,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ArrowDropDown } from '@edx/paragon/icons';
import moodyLogo from '../../../assets/Moody-logo.svg';
import DropdownNavHeader from './dropdown-nav-header/DropdownNavHeader';
import NavHeader from './nav-header/NavHeader';

const HeaderED = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <header>
      <div className="d-flex flex-row justify-content-between align-items-center header-wrapper">
        <div className="left-side-container">
          <div className="logo-container mr-4">
            <Link to="/">
              <img className="h-100" src={moodyLogo} alt="edspirit-logo" />
            </Link>
          </div>
          {location.pathname === '/' || location.pathname === '/home' ? (
            <DropdownNavHeader />
          ) : (
            <NavHeader />
          )}
        </div>
        <div className="d-flex right-side-wrapper">
          <SearchField
            onSubmit={() => history.push('/search')}
            placeholder="What do you want to learn?"
          />
          <div className="d-flex align-items-center">
            <Button variant="tertiary" size="sm" className="mx-1">
              Help
            </Button>
          </div>
          <div className="sign-in-container">
            {location.pathname === '/' || location.pathname === '/home' ? (
              <>
                <Button
                  variant="tertiary"
                  className="mx-1"
                  size="sm"
                  href={`${getConfig().LMS_BASE_URL}/login`}
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
            ) : (
              <Dropdown
                className="ml-3 avatar-dropdown-wrapper"
              >
                <Dropdown.Toggle as={AvatarButton} iconAfter={ArrowDropDown} />
                <Dropdown.Menu alignRight>
                  <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/profile`}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/account`}>
                    Account
                  </Dropdown.Item>
                  <Dropdown.Item href="dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item href="/orders">Order History</Dropdown.Item>
                  <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/logout`}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderED;
