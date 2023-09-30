/* eslint-disable react/prop-types */
import { FormattedMessage, FormattedNumber } from '@edx/frontend-platform/i18n';
import React from 'react';
import CourseInfoButtonStatus from '../share/CourseInfoButtonStatus';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';

const MobilePriceWrapper = ({ courseMetaData }) => {
  const {
    isCourseNotStarted,
    isEnrollNotActive,
    hasPreReqCourse,
    warningComponent,
  } = useGetButtonStatus(courseMetaData);
  const coursePrice = courseMetaData?.paid_course?.price || 0;
  const courseCurrency = courseMetaData?.paid_course?.currency || 'USD';
  return (
    <div className="d-flex py-3 px-4 price-wrapper">
      <div className="d-flex flex-column w-100">
        {warningComponent && <div className="mb-2.5">{warningComponent}</div>}
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column">
            <h2>
              {courseMetaData?.paid_course?.price > 0 ? (
                <p className="price-symbol-wrapper">
                  <span className="mr-1">
                    <FormattedMessage id={courseCurrency} defaultMessage="$" />
                  </span>
                  <span className="mr-1">
                    <FormattedNumber
                      value={
                        courseCurrency === 'USD'
                          ? coursePrice / 100
                          : coursePrice
                      }
                      minimumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
                      maximumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
                    />
                  </span>
                </p>
              ) : (
                <FormattedMessage
                  id="courseCard.free.text"
                  defaultMessage="Free"
                />
              )}
            </h2>
            <span className="font-sm">
              <FormattedMessage
                id="courseInfo.lifetimeAccess.text"
                defaultMessage="Lifetime access"
              />
            </span>
          </div>
          <CourseInfoButtonStatus
            courseMetaData={courseMetaData}
            isCourseNotStarted={isCourseNotStarted}
            isEnrollNotActive={isEnrollNotActive}
            hasPreReqCourse={hasPreReqCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default MobilePriceWrapper;
