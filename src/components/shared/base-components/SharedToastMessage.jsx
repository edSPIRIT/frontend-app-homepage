import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import { Check } from '@edx/paragon/icons';
import React from 'react';

const SharedToastMessage = () => (
  <div className="d-flex toast-message-wrapper">
    <Icon className="" src={Check} />
    <p>
      <p className="first-title">
        <FormattedMessage
          id="firstTitle.share.toast"
          defaultMessage="Link has been copied successfully!"
        />
      </p>
      <p className="second-title">
        <FormattedMessage
          id="secondTitle.share.toast"
          defaultMessage="Share the link with your friends and let them dive into a world of captivating content!"
        />
      </p>
    </p>
  </div>
);

export default SharedToastMessage;
