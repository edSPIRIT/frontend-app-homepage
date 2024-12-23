/* eslint-disable react/prop-types */
import { Card, Skeleton } from '@edx/paragon';
import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import logoPlaceholder from '../../../../assets/place-holders/org-place-holder.svg';
import coverPlaceholder from '../../../../assets/place-holders/cover-course-place-holder.svg';
import CourseInfoButtonStatus from '../share/CourseInfoButtonStatus';
import CourseSideBarSkeleton from './CourseInfoSideBar/CourseSideBarSkeleton';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';
import CourseDateInfo from '../share/CourseDateInfo';
import CourseInstructorsItem from '../share/CourseInstructorsItem';
import PriceStatus from '../share/PriceStatus';
import CourseAccessTime from '../share/CourseAccessTime';

const CourseInfoSideBar = ({ courseMetaData, loading }) => {
  const {
    isCourseNotStarted,
    isEnrollNotActive,
    hasPreReqCourse,
    warningComponent,
    isEnrollmentFull,
  } = useGetButtonStatus(courseMetaData);

  return (
    <div className="course-info-side-wrapper">
      {loading ? (
        <CourseSideBarSkeleton />
      ) : (
        <Card className="cards-info-wrapper ">
          <Card.ImageCap
            src={
              `${getConfig().LMS_BASE_URL}${
                courseMetaData?.additional_metadata?.course_image_url
              }` ?? coverPlaceholder
            }
            logoSrc={
              courseMetaData?.partner?.organization?.logo ?? logoPlaceholder
            }
            fallbackSrc={coverPlaceholder}
            fallbackLogoSrc={logoPlaceholder}
            variant="top"
            alt="course-cover"
            // imageLoadingType="lazy"
          />
          <div className="mt-4.5 px-4">
            <h2 className="mb-1">
              <PriceStatus courseMetaData={courseMetaData} />
            </h2>
            <CourseAccessTime courseMetaData={courseMetaData} />
          </div>
          <Card.Section>
            <div className="d-flex flex-column  font-sm">
              <CourseInstructorsItem
                course_slug={courseMetaData?.course_slug}
              />
              <CourseDateInfo courseMetaData={courseMetaData} />
            </div>
            {warningComponent && (
              <div className="mt-2.5">{warningComponent}</div>
            )}
          </Card.Section>
          <Card.Footer>
            <div className="btn-card-info-container d-flex flex-column justify-content-center align-items-center">
              <CourseInfoButtonStatus
                courseMetaData={courseMetaData}
                isCourseNotStarted={isCourseNotStarted}
                isEnrollNotActive={isEnrollNotActive}
                hasPreReqCourse={hasPreReqCourse}
                isEnrollmentFull={isEnrollmentFull}
              />
              <p className="mt-3">
                <span className="mr-1">
                  <FormattedNumber
                    value={
                      courseMetaData?.additional_metadata?.total_enrollments ?? 0
                    }
                  />
                </span>
                <span className="font-sm">
                  <FormattedMessage
                    id="courseInfo.alreadyEnrolled.text"
                    defaultMessage="already enrolled!"
                  />
                </span>
              </p>
            </div>
          </Card.Footer>
        </Card>
      )}
      {loading ? (
        <div className="mt-4 px-5">
          <Skeleton width="100%" height={24} />
        </div>
      ) : (
        courseMetaData?.additional_metadata?.last_modification_date && (
          <p className="font-sm d-flex justify-content-center py-4 date-text">
            <span className="mr-1">
              <FormattedMessage
                id="courseInfo.lastUpdateOn.text"
                defaultMessage="Last update on"
              />
            </span>
            <span>
              <FormattedDate
                value={
                  courseMetaData?.additional_metadata?.last_modification_date
                }
                day="numeric"
                month="short"
                year="numeric"
              />
            </span>
          </p>
        )
      )}
    </div>
  );
};
export default CourseInfoSideBar;
