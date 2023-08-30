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
  hasPreReqCourse,
}) => {
  const buttonStatus = () => {
    if (certificateData) {
      return <ViewCertificateButton certificateData={certificateData} />;
    }
    return (
      <GoResumeCourseButton
        courseInfo={courseInfo}
        calcProgress={calcProgress}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={hasPreReqCourse}
      />
    );
  };

  return (
    <div className="d-flex flex-column">
      <ProgressStatus
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={hasPreReqCourse}
      />
      {buttonStatus()}
    </div>
  );
};

export default MobileBottomCard;
