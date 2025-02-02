/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import AuthenticatedButtonStatus from './CourseContent/CourseInfoButtonStatus/AuthenticatedButtonStatus';
import UnAuthenticatedButtonStatus from './CourseContent/CourseInfoButtonStatus/UnAuthenticatedButtonStatus';

const CourseInfoButtonStatus = ({
  courseMetaData,
  isCourseNotStarted,
  isEnrollNotActive,
  hasPreReqCourse,
  isEnrollmentFull,
}) => {
  const { authenticatedUser } = useContext(AppContext);

  if (!authenticatedUser) {
    return (
      <UnAuthenticatedButtonStatus
        courseMetaData={courseMetaData}
        isEnrollNotActive={isEnrollNotActive}
        isEnrollmentFull={isEnrollmentFull}
      />
    );
  }
  return (
    <AuthenticatedButtonStatus
      courseMetaData={courseMetaData}
      isCourseNotStarted={isCourseNotStarted}
      isEnrollNotActive={isEnrollNotActive}
      hasPreReqCourse={hasPreReqCourse}
      isEnrollmentFull={isEnrollmentFull}
    />
  );
};

export default CourseInfoButtonStatus;
