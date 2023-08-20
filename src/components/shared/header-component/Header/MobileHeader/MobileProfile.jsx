import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  Avatar, Button, Icon, Nav,
} from '@edx/paragon';
import { ArrowForwardIos } from '@edx/paragon/icons';
import React, { useContext } from 'react';
import useGetConfig from '../../../../../hooks/useGetConfig';
import handleRedirect, {
  handleLogout,
} from '../../../../../utils/handleRedirect';

const MobileProfile = () => {
  const { authenticatedUser } = useContext(AppContext);
  const baseUrl = new URL(getConfig().LMS_BASE_URL).hostname;
  const { hasBilling } = useGetConfig();

  return (
    <div>
      <div className="profile-header">
        {authenticatedUser ? (
          <a
            href={`https://apps.${baseUrl}/profile/u/${authenticatedUser?.username}`}
            className="d-flex justify-content-center align-items-center text-gray-700 w-100"
          >
            <Avatar className="mr-1 flex-shrink-0" size="sm" />
            <span className="email-title">{authenticatedUser?.email}</span>
            <Icon className="subject-icon ml-1" src={ArrowForwardIos} />
          </a>
        ) : (
          <div className="d-flex w-100 profile-btn-wrapper">
            <Button
              variant="tertiary"
              className="mr-3.5"
              size="sm"
              onClick={handleRedirect}
            >
              <FormattedMessage id="header.signIn" defaultMessage="Sign In" />
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
          </div>
        )}
      </div>

      {authenticatedUser && (
        <nav className="p-4 text-gray-700 font-sm profile-nav-items">
          <Nav.Item>
            <Nav.Link href={`https://apps.${baseUrl}/account`}>
              <FormattedMessage
                id="header.dropdownOption.account"
                defaultMessage="Account"
              />
            </Nav.Link>
          </Nav.Item>
          {hasBilling && (
            <Nav.Item>
              <Nav.Link href={`https://billing.${baseUrl}`}>
                <FormattedMessage
                  id="header.dropdownOption.orderHistory"
                  defaultMessage="Order History"
                />
              </Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link onClick={handleLogout}>
              <FormattedMessage
                id="header.dropdownOption.signOut"
                defaultMessage="Sign Out"
              />
            </Nav.Link>
          </Nav.Item>
        </nav>
      )}
    </div>
  );
};

export default MobileProfile;