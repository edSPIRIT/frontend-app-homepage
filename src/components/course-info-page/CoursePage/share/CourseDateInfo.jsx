/* eslint-disable react/prop-types */
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import { Calendar, Event, WatchFilled } from '@edx/paragon/icons';
import React from 'react';
import messages from '../../../../messages';

const CourseDateInfo = ({ courseMetaData, intl }) => {
  const currentDate = new Date();

  const courseEnd = courseMetaData?.additional_metadata?.course_end
    ? new Date(courseMetaData?.additional_metadata?.course_end)
    : null;
  const courseStart = courseMetaData?.additional_metadata?.course_start
    ? new Date(courseMetaData?.additional_metadata?.course_start)
    : null;
  const courseEnrollmentEnd = courseMetaData?.additional_metadata
    ?.enrollment_end
    ? new Date(courseMetaData?.additional_metadata?.enrollment_end)
    : null;
  const courseEnrollmentStart = courseMetaData?.additional_metadata
    ?.enrollment_start
    ? new Date(courseMetaData?.additional_metadata?.enrollment_start)
    : null;
  return (
    <>
      {courseEnrollmentStart && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={Calendar} />
          <p className="color-black">
            <span className="mr-1">
              {courseEnrollmentStart < currentDate ? (
                <FormattedMessage
                  id="courseInfo.registrationHasStart.text"
                  defaultMessage="Registration has started on"
                />
              ) : (
                <FormattedMessage
                  id="courseInfo.registrationWillStart.text"
                  defaultMessage="Registration will start on"
                />
              )}
            </span>
            <span>
              <FormattedDate
                value={courseEnrollmentStart}
                day="numeric"
                month="long"
                year="numeric"
              />
            </span>
          </p>
        </div>
      )}
      {courseEnrollmentEnd && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={Calendar} />
          <p className="color-black">
            <span className="mr-1">
              {courseEnrollmentEnd < currentDate ? (
                <FormattedMessage
                  id="courseInfo.registrationHasEnded.text"
                  defaultMessage="Registration has ended on"
                />
              ) : (
                <FormattedMessage
                  id="courseInfo.registrationWillEnd.text"
                  defaultMessage="Registration will end on"
                />
              )}
            </span>
            <FormattedDate
              value={courseEnrollmentEnd}
              day="numeric"
              month="long"
              year="numeric"
            />
          </p>
        </div>
      )}
      {courseStart && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={Event} />
          <p className="color-black">
            <span className="mr-1">
              {courseStart < currentDate ? (
                <FormattedMessage
                  id="courseInfo.courseHasStarted.text"
                  defaultMessage="Course has started on"
                />
              ) : (
                <FormattedMessage
                  id="courseInfo.courseWillStart.text"
                  defaultMessage="Course will start on"
                />
              )}
            </span>
            <FormattedDate
              value={courseStart}
              day="numeric"
              month="long"
              year="numeric"
            />
          </p>
        </div>
      )}
      {courseEnd && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={Event} />
          <p className="color-black">
            <span className="mr-1">
              {courseEnd < currentDate ? (
                <FormattedMessage
                  id="courseInfo.registrationStartingOn.text"
                  defaultMessage="Course has ended on"
                />
              ) : (
                <FormattedMessage
                  id="courseInfo.registrationStartingOn.text"
                  defaultMessage="Course will end on"
                />
              )}
            </span>
            <FormattedDate
              value={courseEnd}
              day="numeric"
              month="long"
              year="numeric"
            />
          </p>
        </div>
      )}
      {courseMetaData?.total_weeks_of_effort > 0 && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={WatchFilled} />
          <p className="color-black">
            <span className="mr-1">
              <FormattedMessage
                id="courseCard.weeks.text"
                defaultMessage="{weekCount, number} {weekCount, plural, one {Week} other {Weeks}}"
                values={{
                  weekCount: courseMetaData?.total_weeks_of_effort,
                }}
              />
            </span>
            {courseMetaData?.hours_effort_per_week_min
              && courseMetaData?.hours_effort_per_week_max && (
                <span className="text-gray-700">
                  (
                  <FormattedNumber
                    value={courseMetaData?.hours_effort_per_week_min}
                  />
                  -
                  <FormattedNumber
                    value={courseMetaData?.hours_effort_per_week_max}
                  />{' '}
                  {intl.formatMessage(messages['courseCard.hoursPerWeek.text'])}
                  )
                </span>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default injectIntl(CourseDateInfo);
