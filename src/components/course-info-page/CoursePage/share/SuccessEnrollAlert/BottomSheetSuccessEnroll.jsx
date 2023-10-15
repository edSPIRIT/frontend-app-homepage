/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import React from 'react';
import AlertButtons from './AlertButtons';
import messages from '../../../../../messages';

const BottomSheetSuccessEnroll = ({
  courseMetaData,
  closeAlert,
  successEnrollAlertState,
  warningComponent,
  isCourseNotStarted,
  hasPreReqCourse,
  intl,
}) => (
  <ModalLayer isOpen={successEnrollAlertState} onClose={closeAlert}>
    <div className="d-flex flex-column align-items-center bg-white more-modal-items px-3 py-4 bottom-sheet-alert">
      <div className="d-flex pb-3 icon-wrapper align-items-center">
        <Icon className="mr-2" src={CheckCircle} />
        <h3>{intl.formatMessage(messages['enrollmentSuccessful.title'])}</h3>
      </div>
      <p className="pb-4">
        <FormattedMessage
          id="courseInfo.enrollSuccessAlert.text"
          defaultMessage="Thank you for enrolling in {courseName}. You're on your way to a great learning journey."
          values={{
            courseName: courseMetaData?.additional_metadata?.display_name,
          }}
        />
        {warningComponent && <div className="mt-2.5">{warningComponent}</div>}
      </p>

      <AlertButtons
        courseMetaData={courseMetaData}
        closeAlert={closeAlert}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={hasPreReqCourse}
      />
    </div>
  </ModalLayer>
);

export default injectIntl(BottomSheetSuccessEnroll);
