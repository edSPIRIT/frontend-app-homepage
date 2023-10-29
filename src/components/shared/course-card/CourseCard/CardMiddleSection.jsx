/* eslint-disable react/prop-types */
import {
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import React from 'react';
import { Button, Icon } from '@edx/paragon';
import { BookOpen, Person, WatchFilled } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import messages from '../../../../messages';

const CardMiddleSection = ({ course, intl }) => {
  const coursePrice = course?.paid_course?.price || 0;
  const courseCurrency = course?.paid_course?.currency || 'USD';
  const priceStatus = () => {
    if (coursePrice > 0 && course?.paid_course?.has_trial) {
      return (
        <span className="price-title mt-auto">
          <FormattedMessage
            id="courseCard.freeTrial.text"
            defaultMessage="Free Trial"
          />
        </span>
      );
    }
    if (coursePrice > 0 && !course?.paid_course?.has_trial) {
      return (
        <p className="price-title mt-auto price-symbol-wrapper">
          <span className="mr-1">
            <FormattedMessage id={courseCurrency} defaultMessage="$" />
          </span>
          <span className="mr-1">
            {' '}
            <FormattedNumber
              value={courseCurrency === 'USD' ? coursePrice / 100 : coursePrice}
              minimumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
              maximumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
            />
          </span>
        </p>
      );
    }
    return (
      <span className="price-title mt-auto">
        <FormattedMessage id="courseCard.free.text" defaultMessage="Free" />
      </span>
    );
  };

  return (
    <div className="d-flex p-4 flex-column justify-content-between flex-grow-1">
      <div className="d-flex flex-column font-sm flex-grow-1">
        {course?.instructors.length > 0 && (
          <div className="d-flex flex-row align-items-center mb-2">
            <Icon className="card-icon" src={Person} />
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
        )}
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
            <p className="color-black">
              <span className="mr-1">
                <FormattedMessage
                  id="courseCard.weeks.text"
                  defaultMessage="{weekCount, number} {weekCount, plural, one {Week} other {Weeks}}"
                  values={{
                    weekCount: course?.total_weeks_of_effort,
                  }}
                />
              </span>
              {course?.hours_effort_per_week_min
                && course?.hours_effort_per_week_max && (
                  <span className="text-gray-700">
                    (
                    <FormattedNumber
                      value={course?.hours_effort_per_week_min}
                    />
                    -
                    <FormattedNumber
                      value={course?.hours_effort_per_week_max}
                    />{' '}
                    {intl.formatMessage(
                      messages['courseCard.hoursPerWeek.text'],
                    )}
                    )
                  </span>
              )}
            </p>
          </div>
        )}
        {priceStatus()}
      </div>
      <div className="btn-card-container mt-3">
        <Button variant="primary" className="learn-btn">
          <FormattedMessage
            id="courseCard.learnMore.button"
            defaultMessage="Learn More"
          />
        </Button>
      </div>
    </div>
  );
};

export default injectIntl(CardMiddleSection);
