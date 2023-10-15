/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import React from 'react';
import FailedPaymentAlertButtons from './share/FailedPaymentAlertButtons';
import messages from '../../../../messages';

const BottomSheetFailedPayment = ({
  courseMetaData,
  isOpen,
  setOpen,
  intl,
}) => (
  <ModalLayer isOpen={isOpen} onClose={() => setOpen(false)}>
    <div className="d-flex flex-column align-items-center bg-white more-modal-items px-3 py-4 bottom-sheet-alert">
      <div className="d-flex pb-3 color-danger-500 align-items-center">
        <Icon className="mr-2" src={Info} />
        <h3 className="color-danger-900">{intl.formatMessage(messages['transaction.failed'])}</h3>
      </div>
      <p className="pb-4">
        <FormattedMessage
          id="courseInfo.enrollSuccessAlert.text"
          defaultMessage="Thank you for enrolling in {courseName}. You're on your way to a great learning journey."
          values={{
            courseName: courseMetaData?.additional_metadata?.display_name,
          }}
        />
      </p>
      <FailedPaymentAlertButtons
        courseMetaData={courseMetaData}
        setOpen={setOpen}
      />
    </div>
  </ModalLayer>
);

export default injectIntl(BottomSheetFailedPayment);
