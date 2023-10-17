/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import ProgressStatus from '../share/ProgressStatus';
import GoResumeCourseButton from '../share/GoResumeCourseButton';
import ViewCertificateButton from '../share/ViewCertificateButton';

const TabletBottomCard = React.lazy(() => import('./BottomCardSection/TabletBottomCard'));
const MobileBottomCard = React.lazy(() => import('./BottomCardSection/MobileBottomCard'));

const BottomCardSection = ({
  courseInfo, isCourseNotStarted, preReqCourse, certUrl,
}) => {
  const isTablet = useMediaQuery({ minWidth: '601px', maxWidth: '768px' });
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const courseCompleted = courseInfo?.progress?.complete_count > 0
    && courseInfo?.progress?.incomplete_count === 0;

  const calcProgress = () => {
    const { complete_count, incomplete_count } = courseInfo?.progress;

    if (complete_count === 0) {
      return 0;
    }

    const progress = (complete_count / (complete_count + incomplete_count)) * 100;
    return Math.round(progress);
  };

  const buttonStatus = () => {
    if (certUrl) {
      return <ViewCertificateButton certUrl={certUrl} />;
    }
    return (
      <GoResumeCourseButton
        courseId={courseInfo?.course_details?.course_id}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={preReqCourse}
      />
    );
  };

  if (isTablet) {
    return (
      <TabletBottomCard
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        certUrl={certUrl}
        isCourseNotStarted={isCourseNotStarted}
        preReqCourse={preReqCourse}
      />
    );
  }
  if (isMobile) {
    return (
      <MobileBottomCard
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        certUrl={certUrl}
        courseInfo={courseInfo}
        isCourseNotStarted={isCourseNotStarted}
        preReqCourse={preReqCourse}
      />
    );
  }
  return (
    <div className="d-flex align-items-center justify-content-between bottom-wrapper">
      <ProgressStatus
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        isCourseNotStarted={isCourseNotStarted}
        preReqCourse={preReqCourse}
      />
      <div className="course-card-btn-wrapper">
        {buttonStatus()}
      </div>
    </div>
  );
};

export default BottomCardSection;
