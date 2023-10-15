/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ActionRow, Button } from '@edx/paragon';
import React from 'react';
import { useHistory } from 'react-router';
import useEnrollClickHandler from '../../../../../hooks/useEnrollClickHandler';

const FailedPaymentAlertButtons = ({ courseMetaData, setOpen }) => {
  const history = useHistory();
  const {
    enrollClickHandler,
    isLoading: enrollLoading,
    availablePaymentData,
  } = useEnrollClickHandler(courseMetaData);
  return (
    <ActionRow>
      <ActionRow>
        <Button
          variant="tertiary"
          onClick={() => {
            history.push(`/course/${courseMetaData?.course_slug}`);
            setOpen(false);
          }}
        >
          <FormattedMessage
            id="courseInfo.dismiss.button"
            defaultMessage="Dismiss"
          />
        </Button>
        <Button
          variant="danger"
          disabled={!availablePaymentData}
          loading={enrollLoading}
          onClick={enrollClickHandler}
        >
          <FormattedMessage
            id="courseInfo.RetryPayment.button"
            defaultMessage="Retry Payment"
          />
        </Button>
      </ActionRow>
    </ActionRow>
  );
};

export default FailedPaymentAlertButtons;
