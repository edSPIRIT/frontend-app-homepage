/* eslint-disable react/prop-types */
import { Card, Icon, Skeleton } from '@edx/paragon';
import {
  Record, Event, WatchFilled, Warning,
} from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import logoPlaceholder from '../../../../assets/place-holders/org-place-holder.svg';
import coverPlaceholder from '../../../../assets/place-holders/cover-course-place-holder.svg';
import CourseInfoButtonStatus from '../share/CourseInfoButtonStatus';
import messages from '../../../../messages';
import useGetInstructorCourses from '../../../../hooks/useGetCourseInstructors';
import CourseSideBarSkeleton from './CourseInfoSideBar/CourseSideBarSkeleton';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';

const CourseInfoSideBar = ({ courseMetaData, loading, intl }) => {
  const { instructors, loading: instructorsLoading } = useGetInstructorCourses(
    courseMetaData?.course_slug,
  );
  const { isCourseNotStarted, isEnrollActive, warningMessage } = useGetButtonStatus(courseMetaData);
  return (
    <div className="course-info-side-wrapper">
      {loading ? (
        <CourseSideBarSkeleton instructorsLoading={instructorsLoading} />
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
          />
          <div className="mt-4.5 px-4">
            <h2 className="mb-1">
              {courseMetaData?.paid_course?.price > 0 ? (
                <p className="price-symbol-wrapper">
                  <span className="mr-1">
                    <FormattedMessage
                      id={courseMetaData?.paid_course?.currency}
                      defaultMessage="$"
                    />
                  </span>
                  <span className="mr-1">
                    {courseMetaData?.paid_course?.price}
                  </span>
                </p>
              ) : (
                <FormattedMessage
                  id="courseCard.free.text"
                  defaultMessage="Free"
                />
              )}
            </h2>
            <span className="text-gray-500 font-sm">
              <FormattedMessage
                id="courseInfo.lifetimeAccess.text"
                defaultMessage="Lifetime access"
              />
            </span>
          </div>
          <Card.Section>
            <div className="d-flex flex-column  font-sm">
              {instructors?.length > 0 && (
                <div className="d-flex align-items-start mb-2">
                  <Icon className="card-icon" src={Record} />
                  <p className="program-instructors-wrapper">
                    {instructors?.map((ins) => (
                      <Link
                        key={ins.name}
                        className="instructor-title"
                        to={`/instructor/${ins.slug}`}
                      >
                        {ins.name}
                      </Link>
                    ))}
                  </p>
                </div>
              )}
              {courseMetaData?.additional_metadata?.enrollment_start && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="card-icon" src={Event} />
                <p>
                  <span className="color-black mr-1">
                    <FormattedMessage
                      id="courseInfo.registrationStarDate.text"
                      defaultMessage="Registration start date"
                    />
                  </span>
                  <span>
                    (
                    <FormattedDate
                      value={
                          courseMetaData?.additional_metadata?.enrollment_start
                        }
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                    )
                  </span>
                </p>
              </div>
              )}
              {courseMetaData?.additional_metadata?.enrollment_end && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="card-icon" src={Event} />
                <p>
                  <span className="color-black mr-1">
                    <FormattedMessage
                      id="courseInfo.registrationEndDate.text"
                      defaultMessage="Registration end date"
                    />
                  </span>
                  <span>
                    (
                    <FormattedDate
                      value={
                          courseMetaData?.additional_metadata?.enrollment_end
                        }
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                    )
                  </span>
                </p>
              </div>
              )}
              {courseMetaData?.additional_metadata?.course_start && (
                <div className="d-flex align-items-start mb-2">
                  <Icon className="card-icon" src={Event} />
                  <p>
                    <span className="color-black mr-1">
                      <FormattedMessage
                        id="courseInfo.starting.text"
                        defaultMessage="Starting"
                      />
                    </span>
                    <span>
                      (
                      <FormattedDate
                        value={
                          courseMetaData?.additional_metadata?.course_start
                        }
                        day="numeric"
                        month="long"
                        year="numeric"
                      />
                      )
                    </span>
                  </p>
                </div>
              )}
              {courseMetaData?.additional_metadata?.course_end && (
                <div className="d-flex align-items-start mb-2">
                  <Icon className="card-icon" src={Event} />
                  <p>
                    <span className="color-black mr-1">
                      <FormattedMessage
                        id="courseInfo.ending.text"
                        defaultMessage="Ending"
                      />
                    </span>
                    <span>
                      (
                      <FormattedDate
                        value={courseMetaData?.additional_metadata?.course_end}
                        day="numeric"
                        month="long"
                        year="numeric"
                      />
                      )
                    </span>
                  </p>
                </div>
              )}
              {courseMetaData?.total_weeks_of_effort > 0 && (
                <div className="d-flex align-items-start mb-3">
                  <Icon className="card-icon" src={WatchFilled} />
                  <p className="color-black">
                    <span className="mr-1">
                      <FormattedMessage
                        id="courseCard.weeks.text"
                        defaultMessage="{weekCount, number} {weekCount, plural, one {Week} other {Weeks}}"
                        values={{
                          weekCount: courseMetaData?.total_weeks_of_effort,
                        }}
                      />
                    </span>
                    {courseMetaData?.hours_effort_per_week_min
                      && courseMetaData?.hours_effort_per_week_max && (
                        <span className="text-gray-700">
                          (
                          <FormattedNumber
                            value={courseMetaData?.hours_effort_per_week_min}
                          />
                          -
                          <FormattedNumber
                            value={courseMetaData?.hours_effort_per_week_max}
                          />{' '}
                          {intl.formatMessage(
                            messages['courseCard.hoursPerWeek.text'],
                          )}
                          )
                        </span>
                    )}
                  </p>
                </div>
              )}

            </div>
            {warningMessage() && (
            <div className="d-flex mt-2.5">
              <Icon className="mr-1 warning-icon" src={Warning} />
              <span className="font-sm">{warningMessage()}</span>
            </div>
            )}
          </Card.Section>
          <Card.Footer>
            <div className="btn-card-info-container d-flex flex-column justify-content-center align-items-center">
              <CourseInfoButtonStatus
                courseMetaData={courseMetaData}
                isCourseNotStarted={isCourseNotStarted}
                isEnrollActive={isEnrollActive}
              />
              {courseMetaData?.additional_metadata?.total_enrollments && (
                <p className="mt-3">
                  <span className="mr-1">
                    <FormattedNumber
                      value={
                        courseMetaData?.additional_metadata?.total_enrollments
                      }
                    />
                  </span>
                  <span className="font-sm">
                    <FormattedMessage
                      id="courseInfo.alreadyEnrolled.text"
                      defaultMessage="already enrolled!"
                    />
                  </span>{' '}
                </p>
              )}
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
                weekday="short"
                year="numeric"
              />
            </span>
          </p>
        )
      )}
    </div>
  );
};
export default injectIntl(CourseInfoSideBar);
