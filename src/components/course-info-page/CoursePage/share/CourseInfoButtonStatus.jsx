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
}) => {
  const { authenticatedUser } = useContext(AppContext);

  if (!authenticatedUser) {
    return (
      <UnAuthenticatedButtonStatus
        courseMetaData={courseMetaData}
        isEnrollNotActive={isEnrollNotActive}
      />
    );
  }
  return (
    <AuthenticatedButtonStatus
      courseMetaData={courseMetaData}
      isCourseNotStarted={isCourseNotStarted}
      isEnrollNotActive={isEnrollNotActive}
      hasPreReqCourse={hasPreReqCourse}
    />
  );
};

export default CourseInfoButtonStatus;
