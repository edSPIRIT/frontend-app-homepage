/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Card, useMediaQuery, useToggle } from '@edx/paragon';

import { getConfig } from '@edx/frontend-platform';
import cardPlaceholder from '../../../assets/place-holders/user-course-placeholder.svg';
import MoreButtonModal from './user-course-card/MoreButtonModal';
import TopCardSection from './user-course-card/TopCardSection';
import BottomCardSection from './user-course-card/BottomCardSection';
import useUserCourseButtonStatus from '../../../hooks/utils/useUserCourseButtonStatus';

const UserCourseCard = ({ courseInfo }) => {
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const { isCourseNotStarted, hasPreReqCourse } = useUserCourseButtonStatus(courseInfo);
  const courseUrl = (isCourseNotStarted || hasPreReqCourse)
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
                isCourseNotStarted={isCourseNotStarted}
                hasPreReqCourse={hasPreReqCourse}
              />
            </Card.Section>
          </Card.Body>
        </Card>
      </a>
    </>
  );
};

export default UserCourseCard;
