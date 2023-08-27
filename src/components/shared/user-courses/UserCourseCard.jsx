/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Card, useMediaQuery, useToggle } from '@edx/paragon';

import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import cardPlaceholder from '../../../assets/place-holders/user-course-placeholder.svg';
import MoreButtonModal from './user-course-card/MoreButtonModal';
import TopCardSection from './user-course-card/TopCardSection';
import BottomCardSection from './user-course-card/BottomCardSection';

const UserCourseCard = ({ courseInfo }) => {
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (courseInfo) {
      const currentDate = new Date();
      const courseStartDate = courseInfo?.course_details?.course_start
        ? new Date(courseInfo?.course_details?.course_start)
        : null;
      const isCourseNotStarted = courseStartDate && currentDate < courseStartDate;

      setStatus({
        isCourseNotStarted,
      });
    }
  }, [courseInfo]);

  const courseUrl = status?.isCourseNotStarted
    ? null
    : `${getConfig().LEARNING_BASE_URL}/course/${
      courseInfo?.course_details?.course_id
    }/home`;
  return (
    <>
      <MoreButtonModal
        isOpen={isOpen}
        onClose={close}
        courseInfo={courseInfo}
      />
      <a href={courseUrl} className="user-card-course">
        <Card
          className="mb-4 user-card-course"
          orientation={isMobile ? 'vertical' : 'horizontal'}
        >
          <Card.ImageCap
            src={
              courseInfo?.course_details?.course_image_url
                ? `${getConfig().LMS_BASE_URL}${
                  courseInfo.course_details.course_image_url
                }`
                : cardPlaceholder
            }
            srcAlt="Card image"
            fallbackSrc={cardPlaceholder}
          />
          <Card.Body>
            <Card.Section>
              <TopCardSection courseInfo={courseInfo} openMoreBtnModal={open} />
              <BottomCardSection
                courseInfo={courseInfo}
                isCourseNotStarted={status?.isCourseNotStarted}
              />
            </Card.Section>
          </Card.Body>
        </Card>
      </a>
    </>
  );
};

export default UserCourseCard;
