/* eslint-disable react/prop-types */
import {
  FormattedDate,
  FormattedMessage,
} from '@edx/frontend-platform/i18n';
import React from 'react';

const CourseAccessTime = ({ courseMetaData }) => {
  const coursePrice = courseMetaData?.paid_course?.price_human_numeric || 0;
  const hasTrial = courseMetaData?.paid_course?.has_trial;
  let courseCurrency = courseMetaData?.paid_course?.currency || '$';
  // check if courseCurrency is Rials
  courseCurrency = courseCurrency === 'IRR' ? 'IRT' : courseCurrency;
  return hasTrial ? (
    <p className="d-flex flex-wrap font-sm">
      <span className="mr-1">
        <FormattedMessage id="courseInfo.until.text" defaultMessage="Until" />
      </span>
      <span>
        <FormattedDate
          value={courseMetaData?.paid_course?.trial_end}
          day="numeric"
          month="short"
          year="numeric"
        />
      </span>
      {courseMetaData?.paid_course?.show_price_on_trial ? (
        <>
          <span className="ml-1">
            <FormattedMessage id="courseInfo.then.text" defaultMessage="then" />
          </span>
          <span className="price-symbol-wrapper ml-1">
            <span className="mr-1">
              <FormattedMessage id={courseCurrency} />
            </span>
            <span className="mr-1">
              {coursePrice}
            </span>
          </span>
        </>
      ) : null}
    </p>
  ) : (
    <span className="text-gray-500 font-sm">
      <FormattedMessage
        id="courseInfo.lifetimeAccess.text"
        defaultMessage="Lifetime access"
      />
    </span>
  );
};

export default CourseAccessTime;
