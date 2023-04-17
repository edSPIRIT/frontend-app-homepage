import {
  Card, Toast, useMediaQuery, useToggle,
} from '@edx/paragon';
import { useState } from 'react';

import { getConfig } from '@edx/frontend-platform';
import PropTypes from 'prop-types';
import cardPlaceholder from '../../../assets/card-placeholder.png';
import MoreButtonModal from './user-course-card/MoreButtonModal';
import TopCardSection from './user-course-card/TopCardSection';
import BottomCardSection from './user-course-card/BottomCardSection';

const UserCourseCard = ({ courseInfo }) => {
  const [showToast, setShowToast] = useState(false);
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  return (
    <>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000}>
        Course Deleted
      </Toast>
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
              `${getConfig().LMS_BASE_URL}${
                courseInfo?.course_details?.course_image_url
              }` ?? cardPlaceholder
            }
            srcAlt="Card image"
          />
          <Card.Body>
            <Card.Section>
              <TopCardSection courseInfo={courseInfo} openMoreBtn={open} />
              <BottomCardSection courseInfo={courseInfo} />
            </Card.Section>
          </Card.Body>
        </Card>
      </a>
    </>
  );
};
UserCourseCard.propTypes = {
  courseInfo: {
    created: PropTypes.string,
    mode: PropTypes.string,
    is_active: PropTypes.bool,
    course_details: PropTypes.shape({
      course_id: PropTypes.string,
      course_name: PropTypes.string,
      enrollment_start: PropTypes.string,
      enrollment_end: PropTypes.string,
      course_start: PropTypes.string,
      course_end: PropTypes.string,
      invite_only: PropTypes.bool,
      course_modes: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string,
          name: PropTypes.string,
          min_price: PropTypes.number,
          suggested_prices: PropTypes.string,
          currency: PropTypes.string,
          expiration_datetime: PropTypes.string,
          description: PropTypes.string,
          sku: PropTypes.string,
          bulk_sku: PropTypes.string,
        }),
      ),
      pacing_type: PropTypes.string,
      banner_image_url: PropTypes.string,
      course_image_url: PropTypes.string,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string,
      short_name: PropTypes.string,
    }),
    progress: PropTypes.shape({
      complete_count: PropTypes.number,
      incomplete_count: PropTypes.number,
      locked_count: PropTypes.number,
    }),
    course_metadata: PropTypes.shape({
      slug: PropTypes.string,
    }),
    user: PropTypes.string,
  },
};
UserCourseCard.defaultProps = {
  courseInfo: undefined,
};
export default UserCourseCard;
