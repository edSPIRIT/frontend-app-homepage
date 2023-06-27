/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import { BookOpen, Groups } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import userAvatar from '../../../../assets/place-holders/user-placeholder.svg';

const MobileInstructor = ({ instructor }) => (
  <Link
    to={`/instructor/${instructor?.slug}`}
    className="instructor-wrapper d-flex"
  >
    <div className="d-flex flex-column">
      <div className="d-flex">
        <div className="instructor-img-wrapper mr-4">
          <img src={instructor?.image ?? userAvatar} alt="instructor-avatar" />
        </div>
        <div className="d-flex flex-column w-100">
          <span className="instructor-title mb-1">{instructor?.name}</span>
          <span className="instructor-short-bio">{instructor?.short_bio}</span>
        </div>
      </div>
      <p className="instructor-bio mb-3 mt-3">{instructor?.bio}</p>
      <div className="d-flex icons-bottom-wrapper mt-auto">
        <div className="d-flex mr-4.5 align-items-center">
          <Icon src={Groups} className="mr-2" />
          <p>
            <span>{instructor?.students_count}</span>
            <span className="ml-1">
              <FormattedMessage
                id="partners.snapShut.learners.text"
                defaultMessage="Learners"
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

export default MobileInstructor;
