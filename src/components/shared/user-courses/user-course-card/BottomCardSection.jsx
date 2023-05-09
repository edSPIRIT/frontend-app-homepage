/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Button, Icon, ProgressBar } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetCertificate from '../../../../hooks/useGetCertificate';

const BottomCardSection = ({ courseInfo }) => {
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
  const courseStatus = () => {
    if (courseCompleted) {
      return (
        <div className="complete-wrapper d-flex justify-content-between w-100 align-items-center">
          <div className="d-flex align-items-center ">
            <Icon className="check-circle-icon mr-2.5" src={CheckCircle} />
            <span className="second-title">
              <FormattedMessage
                id="header.nav.completed"
                defaultMessage="Completed"
              />
            </span>
          </div>
          <div className="d-flex view-course-btn">
            <Button
              className="view-btn"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${getConfig().LMS_BASE_URL}${
                  certificateData?.download_url
                }`;
              }}
              disabled={!certificateData}
            >
              <FormattedMessage
                id="userCourseCard.viewCertificate.text"
                defaultMessage="View certificate"
              />
            </Button>
          </div>
        </div>
      );
    }
    return (
      <>
        <ProgressBar now={calcProgress()} label={`${calcProgress()}%`} />
        <Link
          className="view-btn view-course-btn"
          to={`/course/${courseInfo?.course_metadata?.slug}`}
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
                id="userCourseCard.viewCourse.text"
                defaultMessage="View Course"
              />
            </span>
          )}
        </Link>
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
