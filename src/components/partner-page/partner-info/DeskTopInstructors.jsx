import { Icon, IconButton } from '@edx/paragon';
import { ArrowForward, BookOpen, People } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { INSTRUCTORS } from '../../../utils/constants';
import userAvatar from '../../../assets/place-holders/user-placeholder.svg';

const DeskTopInstructors = () => (
  <div className="custom-container mb-5.5" id="instructors">
    <h2 className="text-center pb-4.5">
      <FormattedMessage id="instructors.text" defaultMessage="Instructors" />
    </h2>
    <div className="instructors-wrapper">
      {/* todo: must use Insreuctor component like course info */}
      {INSTRUCTORS.map((instructor) => (
        <div className="instructor-wrapper d-flex" key={instructor.name}>
          <div className="instructor-img-wrapper mr-4">
            <img src={instructor.image ?? userAvatar} alt="instructor-avatar" />
          </div>
          <div className="d-flex flex-column">
            <div className="instructor-name-wrapper">
              <span className="instructor-title mr-5">{instructor.name}</span>
              <IconButton
                className="arrow-forward-btn"
                src={ArrowForward}
                iconAs={Icon}
                alt="ArrowForward"
                variant="light"
              />
            </div>
            <span className="instructor-short-bio mb-2">
              {instructor.shortBio}
            </span>
            <p className="instructor-bio mb-3">{instructor.bio}</p>
            <div className="d-flex icons-bottom-wrapper">
              <div className="d-flex mr-4.5 align-items-center">
                <Icon src={People} className="mr-2" />
                <p>
                  <span>{instructor.students}</span>
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
                  <span>{instructor.courses}</span>
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
        </div>
      ))}
    </div>
  </div>
);

export default DeskTopInstructors;
