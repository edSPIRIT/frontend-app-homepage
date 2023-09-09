/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Button, useMediaQuery } from '@edx/paragon';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetCertificate from '../../../../hooks/useGetCertificate';
import ProgressStatus from '../share/ProgressStatus';
import GoResumeCourseButton from '../share/GoResumeCourseButton';
import ViewCertificateButton from '../share/ViewCertificateButton';

const TabletBottomCard = React.lazy(() => import('./BottomCardSection/TabletBottomCard'));
const MobileBottomCard = React.lazy(() => import('./BottomCardSection/MobileBottomCard'));

const BottomCardSection = ({ courseInfo, isCourseNotStarted, preReqCourse }) => {
  const isTablet = useMediaQuery({ minWidth: '601px', maxWidth: '768px' });
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const { certificateData } = useGetCertificate(courseInfo);
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
    if (certificateData) {
      return <ViewCertificateButton certificateData={certificateData} />;
    }
    return (
      <GoResumeCourseButton
        courseInfo={courseInfo}
        calcProgress={calcProgress}
        isCourseNotStarted={isCourseNotStarted}
        preReqCourse={preReqCourse}
      />
    );
  };

  if (isTablet) {
    return (
      <TabletBottomCard
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        certificateData={certificateData}
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
        certificateData={certificateData}
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
      <div className="ml-3 course-card-btn-wrapper">
        <Button
          className="course-info-button view-course-btn mr-2"
          variant="outline-primary"
          to={`/course/${courseInfo?.course_metadata?.slug}`}
          as={Link}
        >
          <span>
            <FormattedMessage
              id="userCourseCard.courseInfo.button"
              defaultMessage="Course Info"
            />
          </span>
        </Button>
        {buttonStatus()}
      </div>
    </div>
  );
};

export default BottomCardSection;
