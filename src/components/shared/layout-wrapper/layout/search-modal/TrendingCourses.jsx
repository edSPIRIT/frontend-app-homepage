import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';
import { TRENDING_COURSES } from '../../../../../utils/constants';

const TrendingCourses = () => (
  <div className="d-flex flex-column px-4 mt-3">
    <h4 className="mb-3">
      <FormattedMessage
        id="searchModal.trendingCourses.text"
        defaultMessage="Trending courses"
      />
    </h4>
    <div>
      {TRENDING_COURSES.map((course) => (
        <div className="mb-2.5" key={course.title}>
          <p className="mb-2">{course.title}</p>
          <p className="text-gray-500 font-xs">{course.institution}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TrendingCourses;
