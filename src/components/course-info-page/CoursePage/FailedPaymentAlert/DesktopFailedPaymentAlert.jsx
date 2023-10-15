/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { AlertModal } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import React from 'react';
import messages from '../../../../messages';
import FailedPaymentAlertButtons from './share/FailedPaymentAlertButtons';

const DesktopFailedPaymentAlert = ({
  courseMetaData,
  isOpen,
  setOpen,
  intl,
}) => (
  <AlertModal
    className="course-info-alert"
    title={intl.formatMessage(messages['transaction.failed'])}
    isOpen={isOpen}
    onClose={() => setOpen(false)}
    variant="danger"
    icon={Info}
    footerNode={(
      <FailedPaymentAlertButtons
        courseMetaData={courseMetaData}
        setOpen={setOpen}
      />
    )}
  >
    <p>
      <FormattedMessage
        id="courseInfo.unsuccessfulPaymentMessage.text"
        defaultMessage="Please check your payment details and try again. If the issue persists, feel free to contact our support team for assistance."
      />
    </p>
  </AlertModal>
);

export default injectIntl(DesktopFailedPaymentAlert);
