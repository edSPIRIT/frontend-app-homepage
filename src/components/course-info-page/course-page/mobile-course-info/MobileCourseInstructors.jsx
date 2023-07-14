/* eslint-disable react/prop-types */
import { Icon, Skeleton } from '@edx/paragon';
import { BookOpen, Groups } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import userAvatar from '../../../../assets/place-holders/user-placeholder.svg';
import useGetInstructorCourses from '../../../../hooks/useGetCourseInstructors';

const MobileCourseInstructors = ({ courseSlug }) => {
  const { instructors, loading } = useGetInstructorCourses(courseSlug);

  return (
    <div className="course-info-instructors mt-5" id="instructors">
      <h2 className="mb-3">
        <FormattedMessage id="instructors.text" defaultMessage="Instructors" />
      </h2>
      <div className="instructors-wrapper ">
        {loading
          ? Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="d-flex flex-column instructor-wrapper" key={i}>
                <div className="d-flex">
                  <Skeleton className="mr-4" width={60} height={60} />
                  <div className="d-flex flex-column w-100 ">
                    <Skeleton height={24} />
                    <Skeleton className="mb-2.5" height={20} />
                  </div>
                </div>
                <div className="skeleton-icon-wrapper mt-3">
                  <Skeleton height={20} />
                </div>
              </div>
            ))
          : instructors?.map((instructor) => (
            <Link
              to={`/instructor/${instructor?.slug}`}
              className="instructor-wrapper d-flex"
              key={instructor?.slug}
            >
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <div className="instructor-course-img-wrapper">
                    <img
                      src={instructor?.image ?? userAvatar}
                      alt="instructor-avator"
                    />
                  </div>
                  <div className="d-flex flex-column w-100 ">
                    <h4 className="instructor-title mr-5 mb-1">
                      {instructor?.name}
                    </h4>
                    <span className="instructor-short-bio mr-3.5">
                      {instructor?.short_bio}
                    </span>
                  </div>
                </div>
                <div className="d-flex icons-bottom-wrapper mt-3">
                  <div className="d-flex mr-4.5">
                    <Icon src={Groups} className="mr-2" />
                    <p>
                      <FormattedMessage
                        id="learners.text"
                        defaultMessage="{learnerCount, number} {learnerCount, plural, one {Lerner} other {Learners}}"
                        values={{
                          learnerCount: instructor?.students_count,
                        }}
                      />
                    </p>
                  </div>
                  <div className="d-flex">
                    <Icon src={BookOpen} className="mr-2" />
                    <FormattedMessage
                      id="instructor.courses.text"
                      defaultMessage="{courseCount, number} {courseCount, plural, one {Course} other {Courses}}"
                      values={{
                        courseCount: instructor?.courses_count,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {/* <Button variant="outline-primary" className="my-4">
        Show more Instructors
      </Button> */}
    </div>
  );
};

export default MobileCourseInstructors;
