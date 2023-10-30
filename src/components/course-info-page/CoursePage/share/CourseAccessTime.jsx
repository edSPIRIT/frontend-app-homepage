/* eslint-disable react/prop-types */
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import React from 'react';

const CourseAccessTime = ({ courseMetaData }) => {
  const coursePrice = courseMetaData?.paid_course?.price || 0;
  const courseCurrency = courseMetaData?.paid_course?.currency || 'USD';
  const hasTrial = courseMetaData?.paid_course?.has_trial;
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
              <FormattedMessage id={courseCurrency} defaultMessage="$" />
            </span>
            <span className="mr-1">
              <FormattedNumber
                value={
                  courseCurrency === 'USD' ? coursePrice / 100 : coursePrice
                }
                minimumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
                maximumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
              />
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
