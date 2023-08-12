import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="d-flex py-6 align-items-center justify-content-center flex-column vh-100">
    <h1>
      <FormattedMessage
        id="notFountPage.text"
        defaultMessage="Oops! You seem to be lost."
      />
    </h1>
    <Link to="/">
      <FormattedMessage id="header.nav.home" defaultMessage="Home" />
    </Link>
  </div>
);

export default NotFound;
