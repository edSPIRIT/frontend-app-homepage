/* eslint-disable react/prop-types */
import React from 'react';
import CourseInfoButtonStatus from '../share/CourseInfoButtonStatus';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';
import PriceStatus from '../share/PriceStatus';
import CourseAccessTime from '../share/CourseAccessTime';

const MobilePriceWrapper = ({ courseMetaData }) => {
  const {
    isCourseNotStarted,
    isEnrollNotActive,
    hasPreReqCourse,
    warningComponent,
  } = useGetButtonStatus(courseMetaData);

  return (
    <div className="d-flex py-3 px-4 price-wrapper">
      <div className="d-flex flex-column w-100">
        {warningComponent && <div className="mb-2.5">{warningComponent}</div>}
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column">
            <h2>
              <PriceStatus courseMetaData={courseMetaData} />
            </h2>
            <CourseAccessTime courseMetaData={courseMetaData} />
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
