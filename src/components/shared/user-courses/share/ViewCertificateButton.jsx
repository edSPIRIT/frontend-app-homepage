/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import React from 'react';

const ViewCertificateButton = ({ certUrl }) => (
  <Button
    className="view-btn view-course-btn"
    onClick={(e) => {
      e.preventDefault();
      window.location.href = `${getConfig().LMS_BASE_URL}${
        certUrl
      }`;
    }}
  >
    <FormattedMessage
      id="userCourseCard.viewCertificate.text"
      defaultMessage="View Certificate"
    />
  </Button>
);

export default ViewCertificateButton;
