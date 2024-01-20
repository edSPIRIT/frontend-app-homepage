/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import React from 'react';
import handleRedirect from '../../../../../../utils/handleRedirect';
import handleTPARedirect from '../../../../../../utils/handleTPARedirect';
import useEnrollClickHandler from '../../../../../../hooks/useEnrollClickHandler';
import useGetConfig from '../../../../../../hooks/useGetConfig';

const UnAuthenticatedButtonStatus = ({ courseMetaData, isEnrollNotActive }) => {
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);
  const { isTPAOnly, TPAQueryparam } = useGetConfig();

  if (
    courseMetaData?.paid_course?.active
    && !courseMetaData?.paid_course?.has_trial
  ) {
    return (
      <Button
        variant="brand"
        className="enroll-btn"
        onClick={() => (isTPAOnly ? handleTPARedirect(TPAQueryparam) : handleRedirect())}
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
      onClick={() => (isTPAOnly ? handleTPARedirect(TPAQueryparam) : handleRedirect())}
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
