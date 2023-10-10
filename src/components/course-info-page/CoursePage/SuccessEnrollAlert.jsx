/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, AlertModal, Button } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessAlertOpen } from '../../../redux/slice/course/successEnrollmentAlert';
import messages from '../../../messages';

const SuccessEnrollAlert = ({ courseMetaData, intl }) => {
  const dispatch = useDispatch();

  const successEnrollAlertState = useSelector(
    (state) => state.successEnrollmentAlert.open,
  );

  return (
    <AlertModal
      className="course-info-alert"
      isOpen={successEnrollAlertState}
      onClose={() => dispatch(setSuccessAlertOpen(false))}
      variant="success"
      title={intl.formatMessage(messages['enrollmentSuccessful.title'])}
      icon={CheckCircle}
      footerNode={(
        <ActionRow>
          <Button
            variant="tertiary"
            onClick={() => dispatch(setSuccessAlertOpen(false))}
          >
            <FormattedMessage
              id="courseInfo.startLater.button"
              defaultMessage="Start Later"
            />
          </Button>
          <Button
            variant="success"
            href={`${getConfig().LEARNING_BASE_URL}/course/${
              courseMetaData?.course_id
            }/home`}
            target="_blank"
            rel="noreferrer"
            onClick={() => dispatch(setSuccessAlertOpen(false))}
          >
            <FormattedMessage
              id="userCourseCard.goToYourCourse.button"
              defaultMessage="Go To Your Course"
            />
          </Button>
        </ActionRow>
      )}
    >
      <p>
        <FormattedMessage
          id="courseInfo.enrollSuccessAlert.text"
          defaultMessage="Thank you for enrolling in {courseName}. You're on your way to a great learning journey."
          values={{
            courseName: courseMetaData?.additional_metadata?.display_name,
          }}
        />
      </p>
    </AlertModal>
  );
};

export default injectIntl(SuccessEnrollAlert);
