import {
  AvatarButton,
  Button,
  Dropdown,
  SearchField,
  Skeleton,
} from '@edx/paragon';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ArrowDropDown } from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import NavHeader from '../nav-header/NavHeader';
import DropdownNavHeader from '../dropdown-nav-header/DropdownNavHeader';
import useGetFooters from '../../../../hooks/useGetFooters';
import edLogo from '../../../../assets/edspirit-logo.png';
import messages from '../../../../messages';
import handleRedirect from '../../../../utils/handleRedirect';
import {
  resetSearchFilters,
  setSearchString,
} from '../../../../redux/slice/searchQuerySlice';

const DesktopHeader = ({ intl }) => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AppContext);
  const { footerData, loading } = useGetFooters();
  const dispatch = useDispatch();

  const handleSubmitSearch = (value) => {
    dispatch(resetSearchFilters());
    dispatch(setSearchString(value));
    history.push('/search');
  };
  return (
    <div className="d-flex flex-row justify-content-between align-items-center header-wrapper">
      <div className="left-side-container">
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
        {authenticatedUser ? <NavHeader /> : <DropdownNavHeader />}
      </div>
      <div className="d-flex right-side-wrapper">
        <SearchField
          onSubmit={handleSubmitSearch}
          placeholder={intl.formatMessage(
            messages['header.search.placeholder'],
          )}
        />
        {/* <div className="d-flex align-items-center">
            <Button variant="tertiary" size="sm" className="mx-1">
              Help
            </Button>
          </div> */}
        <div className="sign-in-container ml-3">
          {authenticatedUser ? (
            <Dropdown className="ml-3 avatar-dropdown-wrapper">
              <Dropdown.Toggle as={AvatarButton} iconAfter={ArrowDropDown} />
              <Dropdown.Menu alignRight>
                <Dropdown.Item
                  href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                    'https://',
                    '',
                  )}/profile/u/${authenticatedUser?.username}`}
                >
                  <FormattedMessage
                    id="header.dropdownOption.profile"
                    defaultMessage="Profile"
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                    'https://',
                    '',
                  )}/account`}
                >
                  <FormattedMessage
                    id="header.dropdownOption.account"
                    defaultMessage="Account"
                  />
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="overview">
                  <FormattedMessage
                    id="header.dropdownOption.dashboard"
                    defaultMessage="Dashboard"
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  href={`https://billing.${getConfig().LMS_BASE_URL.replace(
                    'https://',
                    '',
                  )}`}
                >
                  <FormattedMessage
                    id="header.dropdownOption.orderHistory"
                    defaultMessage="Order History"
                  />
                </Dropdown.Item>
                <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/logout`}>
                  <FormattedMessage
                    id="header.dropdownOption.signOut"
                    defaultMessage="Sign out"
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button
                variant="tertiary"
                className="mx-1"
                size="sm"
                onClick={handleRedirect}
              >
                <FormattedMessage id="header.signIn" defaultMessage="Sign in" />
              </Button>
              <Button
                variant="primary"
                size="sm"
                href={`${getConfig().LMS_BASE_URL}/register`}
              >
                <FormattedMessage
                  id="header.register"
                  defaultMessage="Register"
                />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

DesktopHeader.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DesktopHeader);
