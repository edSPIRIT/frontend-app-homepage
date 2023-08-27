/* eslint-disable react/prop-types */
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import { Event, WatchFilled } from '@edx/paragon/icons';
import React from 'react';
import messages from '../../../../messages';

const CourseDateInfo = ({ courseMetaData, intl }) => (
  <>
    {courseMetaData?.additional_metadata?.enrollment_start && (
      <div className="d-flex align-items-start mb-2">
        <Icon className="card-icon" src={Event} />
        <p className="color-black">
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.registrationStartingOn.text"
              defaultMessage="Registration starting on"
            />
          </span>
          <span>
            <FormattedDate
              value={courseMetaData?.additional_metadata?.enrollment_start}
              day="numeric"
              month="long"
              year="numeric"
            />
          </span>
        </p>
      </div>
    )}
    {courseMetaData?.additional_metadata?.enrollment_end && (
      <div className="d-flex align-items-start mb-2">
        <Icon className="card-icon" src={Event} />
        <p className="color-black">
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.registrationEndingOn.text"
              defaultMessage="Registration Ending on"
            />
          </span>
          <FormattedDate
            value={courseMetaData?.additional_metadata?.enrollment_end}
            day="numeric"
            month="long"
            year="numeric"
          />
        </p>
      </div>
    )}
    {courseMetaData?.additional_metadata?.course_start && (
      <div className="d-flex align-items-start mb-2">
        <Icon className="card-icon" src={Event} />
        <p className="color-black">
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.courseStartingOn.text"
              defaultMessage="Course starting on"
            />
          </span>
          <FormattedDate
            value={courseMetaData?.additional_metadata?.course_start}
            day="numeric"
            month="long"
            year="numeric"
          />
        </p>
      </div>
    )}
    {courseMetaData?.additional_metadata?.course_end && (
      <div className="d-flex align-items-start mb-2">
        <Icon className="card-icon" src={Event} />
        <p className="color-black">
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.courseEndingOn.text"
              defaultMessage="Course ending on"
            />
          </span>
          <FormattedDate
            value={courseMetaData?.additional_metadata?.course_end}
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
                {intl.formatMessage(messages['courseCard.hoursPerWeek.text'])})
              </span>
          )}
        </p>
      </div>
    )}
  </>
);

export default injectIntl(CourseDateInfo);
