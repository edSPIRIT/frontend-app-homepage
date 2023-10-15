/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { AlertModal } from '@edx/paragon';
import React from 'react';
import { CheckCircle } from '@edx/paragon/icons';
import AlertButtons from './AlertButtons';
import messages from '../../../../../messages';

const DesktopSuccessEnrollAlert = ({
  courseMetaData,
  closeAlert,
  successEnrollAlertState,
  warningComponent,
  isCourseNotStarted,
  hasPreReqCourse,
  intl,
}) => (
  <AlertModal
    className="course-info-alert success-alert"
    isOpen={successEnrollAlertState}
    onClose={closeAlert}
    variant="success"
    title={intl.formatMessage(messages['enrollmentSuccessful.title'])}
    icon={CheckCircle}
    footerNode={(
      <AlertButtons
        courseMetaData={courseMetaData}
        closeAlert={closeAlert}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={hasPreReqCourse}
      />
    )}
  >
    <FormattedMessage
      id="courseInfo.enrollSuccessAlert.text"
      defaultMessage="Thank you for enrolling in {courseName}. You're on your way to a great learning journey."
      values={{
        courseName: courseMetaData?.additional_metadata?.display_name,
      }}
    />
    {warningComponent && <div className="mt-2.5">{warningComponent}</div>}
  </AlertModal>
);

export default injectIntl(DesktopSuccessEnrollAlert);
