/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import React from 'react';
import handleRedirect from '../../../../../../utils/handleRedirect';
import useEnrollClickHandler from '../../../../../../hooks/useEnrollClickHandler';

const UnAuthenticatedButtonStatus = ({
  courseMetaData,
  hasPrice,
  hasTrial,
  isEnrollNotActive,
}) => {
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);

  if (hasPrice && !hasTrial) {
    return (
      <Button
        variant="brand"
        className="enroll-btn"
        onClick={handleRedirect}
        disabled={!availablePaymentData || isEnrollNotActive}
      >
        <FormattedMessage
          id="courseInfo.purchaseNow.text"
          defaultMessage="Purchase"
        />
      </Button>
    );
  }
  return (
    <Button
      variant="brand"
      className="enroll-btn"
      onClick={handleRedirect}
      disabled={isEnrollNotActive}
    >
      <FormattedMessage
        id="courseInfo.enrollNow.text"
        defaultMessage="Enroll Now"
        a
      />
    </Button>
  );
};

export default UnAuthenticatedButtonStatus;
