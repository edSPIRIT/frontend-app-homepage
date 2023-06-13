/* eslint-disable react/prop-types */
import { Button } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import AuthenticatedButtonStatus from './course-content/course-info-button-status/AuthenticatedButtonStatus';
import handleRedirect from '../../../../utils/handleRedirect';

const CourseInfoButtonStatus = ({ courseMetaData }) => {
  const { authenticatedUser } = useContext(AppContext);

  if (!authenticatedUser) {
    return (
      <Button variant="brand" className="enroll-btn" onClick={handleRedirect}>
        {courseMetaData?.paid_course?.price > 0 ? (
          <FormattedMessage
            id="courseInfo.purchaseNow.text"
            defaultMessage="Purchase now"
          />
        ) : (
          <FormattedMessage
            id="courseInfo.enrollNow.text"
            defaultMessage="Enroll now"
          />
        )}
      </Button>
    );
  }
  return <AuthenticatedButtonStatus courseMetaData={courseMetaData} />;
};

export default CourseInfoButtonStatus;
