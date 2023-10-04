/* eslint-disable react/prop-types */
import { FormattedDate, FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';

const CourseDate = ({ courseInfo, messageId, defaultMessage }) => (
  <p className="course-date-title">
    <span>
      <FormattedMessage id={messageId} defaultMessage={defaultMessage} />
    </span>
    <span>
      <FormattedDate
        value={
          courseInfo?.course_details?.course_end
          || courseInfo?.course_details?.course_start
        }
        day="numeric"
        month="short"
        year="numeric"
      />
    </span>
  </p>
);

export default CourseDate;
