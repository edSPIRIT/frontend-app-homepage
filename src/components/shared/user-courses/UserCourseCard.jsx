/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Card, useMediaQuery, useToggle } from '@edx/paragon';

import { getConfig } from '@edx/frontend-platform';
import cardPlaceholder from '../../../assets/place-holders/user-course-placeholder.svg';
import MoreButtonModal from './UserCourseCard/MoreButtonModal';
import TopCardSection from './UserCourseCard/TopCardSection';
import BottomCardSection from './UserCourseCard/BottomCardSection';
import useUserCourseButtonStatus from '../../../hooks/utils/useUserCourseButtonStatus';
import useCourseOutline from '../../../hooks/useCourseOutline';

const UserCourseCard = ({ courseInfo }) => {
  const [isOpen, open, close] = useToggle(false);
  const { certUrl } = useCourseOutline(
    courseInfo?.course_details?.course_id,
  );
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const { isCourseNotStarted, preReqCourse } = useUserCourseButtonStatus(courseInfo);
  const courseUrl = isCourseNotStarted || preReqCourse
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
        certUrl={certUrl}
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
              <TopCardSection
                courseInfo={courseInfo}
                openMoreBtnModal={open}
                certUrl={certUrl}
              />
              <BottomCardSection
                courseInfo={courseInfo}
                isCourseNotStarted={isCourseNotStarted}
                preReqCourse={preReqCourse}
                certUrl={certUrl}
              />
            </Card.Section>
          </Card.Body>
        </Card>
      </a>
    </>
  );
};

export default UserCourseCard;
