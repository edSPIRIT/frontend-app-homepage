import { AppContext } from '@edx/frontend-platform/react';
import { Dropdown, Icon } from '@edx/paragon';
import { useContext } from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ArrowDropDown } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import { ReactComponent as Avatar } from '../../../../assets/header-avatar.svg';
import { handleLogout } from '../../../../utils/handleRedirect';
import useGetUserProfile from '../../../../hooks/useGetUserProfile';

const ProfileDropdown = () => {
  const { authenticatedUser } = useContext(AppContext);
  const { userProfile, loading: userProfileLoading } = useGetUserProfile();

  const renderAvatar = () => {
    if (userProfileLoading) {
      return <Icon src={Avatar} />;
    }
    if (userProfile?.profile_image?.has_image) {
      return (
        <div className="avatar-wrapper">
          <img
            src={userProfile?.profile_image?.image_url_medium}
            alt="avatar"
          />
        </div>
      );
    }
    return <Icon src={Avatar} />;
  };

  return (
    <Dropdown className="ml-3 avatar-dropdown-wrapper">
      <Dropdown.Toggle iconAfter={ArrowDropDown} iconBefore={renderAvatar} />
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
        <Dropdown.Item as={Link} to="/overview">
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
        <Dropdown.Item onClick={handleLogout}>
          <FormattedMessage
            id="header.dropdownOption.signOut"
            defaultMessage="Sign Out"
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
