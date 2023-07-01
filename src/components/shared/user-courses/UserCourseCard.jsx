/* eslint-disable react/prop-types */
import {
  Card, useMediaQuery, useToggle,
} from '@edx/paragon';

import { getConfig } from '@edx/frontend-platform';
import cardPlaceholder from '../../../assets/place-holders/book-open.svg';
import MoreButtonModal from './user-course-card/MoreButtonModal';
import TopCardSection from './user-course-card/TopCardSection';
import BottomCardSection from './user-course-card/BottomCardSection';

const UserCourseCard = ({ courseInfo }) => {
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  return (
    <>
      <MoreButtonModal
        isOpen={isOpen}
        onClose={close}
        courseInfo={courseInfo}
      />
      <a
        href={`https://apps.${getConfig().LMS_BASE_URL.replace(
          'https://',
          '',
        )}/learning/course/${courseInfo?.course_details?.course_id}/home`}
        target="_blank"
        className="user-card-course"
        rel="noreferrer"
      >
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
              <BottomCardSection courseInfo={courseInfo} />
            </Card.Section>
          </Card.Body>
        </Card>
      </a>
    </>
  );
};

export default UserCourseCard;
