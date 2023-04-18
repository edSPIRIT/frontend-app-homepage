/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { Icon, ProgressBar } from '@edx/paragon';
import { CheckCircle, Info } from '@edx/paragon/icons';

const BottomCardSection = ({ courseInfo }) => {
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
  const courseStatus = () => {
    if (courseCompleted) {
      return (
        <div className="complete-wrapper d-flex justify-content-between w-100 align-items-center">
          <div className="d-flex align-items-center pt-2.5">
            <Icon className="check-icon mr-2.5" src={CheckCircle} />
            <span className="second-title">Completed</span>
          </div>
          <div className="d-flex view-course-btn">
            <a
              target="_blank"
              href="#/certificate"
              rel="noreferrer"
              className="view-btn"
              onClick={(e) => e.preventDefault}
            >
              View certificate
            </a>
          </div>
        </div>
      );
    }
    return (
      <>
        {courseInprogress ? (
          <ProgressBar now={calcProgress()} label={`${calcProgress()}%`} />
        ) : (
          <div className="d-flex align-items-center">
            <Icon className="info-icon mr-2.5" src={Info} />
            <span className="second-title">Not started yet</span>
          </div>
        )}
        <a
          target="_blank"
          href={`https://apps.${getConfig().LMS_BASE_URL.replace(
            'https://',
            '',
          )}/learning/course/${courseInfo?.course_details?.course_id}/home`}
          rel="noreferrer"
          className="view-btn view-course-btn"
        >
          View Course
        </a>
      </>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between bottom-wrapper">
      {courseStatus()}
    </div>
  );
};

export default BottomCardSection;
