/* eslint-disable react/prop-types */

import { Button, Card, Icon } from '@edx/paragon';
import {
  Person, BookOpen, WatchFilled, Groups,
} from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';
import coverPlaceholder from '../../../assets/place-holders/cover-course-place-holder.svg';
import messages from '../../../messages';

const CourseCardNew = ({ course, intl }) => {
  const isProgram = false;
  const history = useHistory();

  return (
    <Link to={`/course/${course?.course_slug}`}>
      <Card className="cards-wrapper d-flex">
        <Card.ImageCap
          src={
            `${getConfig().LMS_BASE_URL}${
              course?.additional_metadata?.course_image_url
            }` ?? coverPlaceholder
          }
          logoSrc={course?.partner?.organization?.logo ?? logoPlaceholder}
          variant="top"
          srcAlt="course-header"
          logoAlt="partner-logo"
        />
        <div className="mt-4.5 px-4">
          <h4 className="mb-1 course-title">
            {course?.additional_metadata?.display_name}
          </h4>
          <Link
            to={`/partners/${course?.partner?.organization?.short_name}`}
            className="institution-title font-sm"
            href="#institution"
          >
            <p className="institution-title font-sm">
              {course?.additional_metadata?.org}
            </p>
          </Link>
        </div>
        <div className="d-flex p-4 flex-column justify-content-between flex-grow-1">
          <div className="d-flex flex-column font-sm flex-grow-1">
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={isProgram ? Groups : Person} />
              <p className="program-instructors-wrapper">
                {course?.instructors?.map((ins) => (
                  <Link
                    key={ins.slug}
                    className="instructor-title"
                    to={`/instructor/${ins.slug}`}
                  >
                    {ins.name}
                  </Link>
                ))}
              </p>
            </div>
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={BookOpen} />
              <p className="color-black">
                <FormattedMessage
                  id="courseCard.lessons.text"
                  defaultMessage="{lessonCount, number} {lessonCount, plural, one {Lesson} other {Lessons}}"
                  values={{
                    lessonCount: course?.additional_metadata?.units_count,
                  }}
                />
              </p>
            </div>
            {course?.total_weeks_of_effort > 0 && (
              <div className="d-flex flex-row align-items-center mb-3">
                <Icon className="card-icon" src={WatchFilled} />
                <p className="text-black">
                  <span>{course?.total_weeks_of_effort}</span>
                  <span>
                    {' '}
                    <FormattedMessage
                      id="courseCard.weeks.text"
                      defaultMessage="Weeks"
                    />
                  </span>
                  {course?.hours_effort_per_week_min
                    && course?.hours_effort_per_week_max && (
                      <span className="text-gray-700">
                        {' '}
                        {`(${course?.hours_effort_per_week_min}-${
                          course?.hours_effort_per_week_max
                        } ${intl.formatMessage(
                          messages['courseCard.hoursPerWeek.text'],
                        )})`}
                      </span>
                  )}
                </p>
              </div>
            )}
            {course?.paid_course?.price > 0 ? (
              <span className="price-title mt-auto">
                {course?.paid_course?.price_human}
              </span>
            ) : (
              <span className="price-title mt-auto">
                <FormattedMessage
                  id="courseCard.free.text"
                  defaultMessage="Free"
                />
              </span>
            )}
          </div>
          <div className="btn-card-container mt-3">
            <Button
              variant="primary"
              className="learn-btn"
              onClick={() => history.push(course?.course_slug)}
            >
              <FormattedMessage
                id="courseCard.learnMore.button"
                defaultMessage="Learn More"
              />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
CourseCardNew.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseCardNew);
