/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import {
  Button, Icon, ProgressBar, useMediaQuery,
} from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetCertificate from '../../../../hooks/useGetCertificate';
import TabletBottomCard from './BottomCardSection/TabletBottomCard';
import MobileBottomCard from './BottomCardSection/MobileBottomCard';

const BottomCardSection = ({ courseInfo }) => {
  const isTablet = useMediaQuery({ minWidth: '601px', maxWidth: '768px' });
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const { certificateData } = useGetCertificate(courseInfo);
  const courseCompleted = courseInfo?.progress?.complete_count > 0
    && courseInfo?.progress?.incomplete_count === 0;
  const courseInprogress = courseInfo?.resume_course?.has_visited_course;
  const calcProgress = () => {
    if (courseInprogress) {
      const progress = (courseInfo?.progress?.complete_count
          / (courseInfo?.progress?.complete_count
            + courseInfo?.progress?.incomplete_count))
        * 100;
      return Math.round(progress);
    }
    return 0;
  };
  const buttonStatus = () => {
    if (certificateData) {
      return (
        <Button
          className="view-btn view-course-btn mr-2"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${getConfig().LMS_BASE_URL}${
              certificateData?.download_url
            }`;
          }}
        >
          <FormattedMessage
            id="userCourseCard.viewCertificate.text"
            defaultMessage="View Certificate"
          />
        </Button>
      );
    }
    return (
      <Button
        className="view-btn view-course-btn"
        variant="primary"
        href={`https://apps.${getConfig().LMS_BASE_URL.replace(
          'https://',
          '',
        )}/learning/course/${courseInfo?.course_details?.course_id}/home`}
      >
        {calcProgress() > 0 ? (
          <span>
            <FormattedMessage
              id="userCourseCard.resumeCourse.text"
              defaultMessage="Resume Course"
            />
          </span>
        ) : (
          <span>
            <FormattedMessage
              id="userCourseCard.goToYourCourse.button"
              defaultMessage="Go To Your Course"
            />
          </span>
        )}
      </Button>
    );
  };
  if (isTablet) {
    return (
      <TabletBottomCard
        courseCompleted={courseCompleted}
        calcProgress={calcProgress}
        certificateData={certificateData}
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
      />
    );
  }
  return (
    <div className="d-flex align-items-center justify-content-between bottom-wrapper">
      {courseCompleted ? (
        <div className="d-flex align-items-center ">
          <Icon className="check-circle-icon mr-2.5" src={CheckCircle} />
          <span className="second-title">
            <FormattedMessage
              id="userCourseCard.completed.text"
              defaultMessage="Well done! You completed this course"
            />
          </span>
        </div>
      ) : (
        <ProgressBar now={calcProgress()} label={`${calcProgress()}%`} />
      )}
      <div className="d-flex">
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
