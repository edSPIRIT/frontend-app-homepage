/* eslint-disable react/prop-types */
import React from 'react';
import ProgressStatus from '../../share/ProgressStatus';
import ViewCertificateButton from '../../share/ViewCertificateButton';
import GoResumeCourseButton from '../../share/GoResumeCourseButton';

const MobileBottomCard = ({
  courseCompleted,
  calcProgress,
  certificateData,
  courseInfo,
  isCourseNotStarted,
  preReqCourse,
}) => {
  const buttonStatus = () => {
    if (certificateData) {
      return <ViewCertificateButton certificateData={certificateData} />;
    }
    return (
      <GoResumeCourseButton
        courseId={courseInfo?.course_details?.course_id}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={preReqCourse}
      />
    );
  };

  return (
    <div className="d-flex flex-column">
      <ProgressStatus
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        isCourseNotStarted={isCourseNotStarted}
        preReqCourse={preReqCourse}
      />
      {buttonStatus()}
    </div>
  );
};

export default MobileBottomCard;
