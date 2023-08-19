/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import { Warning } from '@edx/paragon/icons';
import React from 'react';
import CourseInfoButtonStatus from '../share/CourseInfoButtonStatus';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';

const MobilePriceWrapper = ({ courseMetaData }) => {
  const { isCourseNotStarted, isEnrollActive, warningMessage } = useGetButtonStatus(courseMetaData);

  return (
    <div className="d-flex py-3 px-4 price-wrapper">
      <div className="d-flex flex-column w-100">
        {warningMessage() && (
          <div className="d-flex  mb-2.5">
            <Icon className="mr-1" src={Warning} />
            <span className="font-sm">{warningMessage()}</span>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column">
            <h2>
              {courseMetaData?.paid_course.price === 0 ? (
                <FormattedMessage
                  id="courseCard.free.text"
                  defaultMessage="Free"
                />
              ) : (
                courseMetaData?.paid_course?.price_human
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
            isEnrollActive={isEnrollActive}
          />
        </div>
      </div>
    </div>
  );
};

export default MobilePriceWrapper;
