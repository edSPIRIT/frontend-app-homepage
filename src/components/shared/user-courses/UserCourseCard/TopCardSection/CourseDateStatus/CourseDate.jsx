/* eslint-disable react/prop-types */
import { FormattedDate, FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';

const CourseDate = ({ courseDate, messageId, defaultMessage }) => (
  <p className="course-date-title">
    <span>
      <FormattedMessage id={messageId} defaultMessage={defaultMessage} />
    </span>
    <span>
      <FormattedDate
        value={courseDate}
        day="numeric"
        month="short"
        year="numeric"
      />
    </span>
  </p>
);

export default CourseDate;
