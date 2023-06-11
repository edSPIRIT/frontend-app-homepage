import { Icon, IconButton } from '@edx/paragon';
import { ArrowForward, BookOpen, People } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import userAvatar from '../../../../../assets/place-holders/user-placeholder.svg';

const InstructorCard = ({ instructor }) => (
  <Link
    to={`/instructor/${instructor?.slug}`}
    className="instructor-wrapper d-flex"
  >
    <div className="instructor-course-img-wrapper">
      <img src={instructor?.image ?? userAvatar} alt="instructor-avator" />
    </div>
    <div className="d-flex flex-column w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="instructor-title mr-5 mb-1">{instructor?.name}</h4>
          <span className="instructor-short-bio mr-3.5">
            {instructor?.short_bio}
          </span>
        </div>
        <IconButton
          className="arrow-forward-btn"
          src={ArrowForward}
          iconAs={Icon}
          alt="ArrowForward"
          variant="light"
        />
      </div>
      <div className="d-flex icons-bottom-wrapper">
        <div className="d-flex mr-4.5 align-items-center">
          <Icon src={People} className="mr-2" />
          <p>
            <span>{instructor?.students_count}</span>
            <span className="ml-1">
              <FormattedMessage
                id="instructor.students.text"
                defaultMessage="Students"
              />
            </span>
          </p>
        </div>
        <div className="d-flex align-items-center">
          <Icon src={BookOpen} className="mr-2" />
          <p>
            <span>{instructor?.courses_count}</span>
            <span className="ml-1">
              <FormattedMessage
                id="instructor.courses.text"
                defaultMessage="Courses"
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  </Link>
);
InstructorCard.defaultProps = {
  instructor: {
    name: PropTypes.string,
    slug: PropTypes.string,
    short_bio: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    website: PropTypes.string,
    linkedin: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    courses: PropTypes.array,
  },
};
InstructorCard.propTypes = {
  instructor: undefined,
};
export default InstructorCard;
