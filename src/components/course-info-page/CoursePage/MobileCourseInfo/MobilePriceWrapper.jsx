/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';
import CourseInfoButtonStatus from '../share/CourseInfoButtonStatus';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';

const MobilePriceWrapper = ({ courseMetaData }) => {
  const {
    isCourseNotStarted, isEnrollNotActive, hasPreReqCourse, warningComponent,
  } = useGetButtonStatus(courseMetaData);

  return (
    <div className="d-flex py-3 px-4 price-wrapper">
      <div className="d-flex flex-column w-100">
        { warningComponent && (
        <div className="mb-2.5">
          {warningComponent}
        </div>
        )}
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column">
            <h2>
              {courseMetaData?.paid_course?.price > 0 ? (
                <p className="price-symbol-wrapper">
                  <span className="mr-1">
                    <FormattedMessage
                      id={courseMetaData?.paid_course?.currency}
                      defaultMessage="$"
                    />
                  </span>
                  <span className="mr-1">
                    {courseMetaData?.paid_course?.price_human_numeric}
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
