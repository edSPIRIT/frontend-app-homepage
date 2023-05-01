/* eslint-disable react/prop-types */
import { Icon, Skeleton } from '@edx/paragon';
import { BookOpen, People } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';

const MobileCourseInstructors = ({ instructors, loading }) => (
  <div className="course-info-instructors mt-5" id="instructors">
    <h2 className="mb-3">Instructors</h2>
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
                    src={instructor?.image}
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
                  <Icon src={People} className="mr-2" />
                  <p>
                    <span>{instructor?.students_count}</span>
                    <span className="ml-1">Students</span>
                  </p>
                </div>
                <div className="d-flex">
                  <Icon src={BookOpen} className="mr-2" />
                  <p>
                    <span>{instructor?.courses_count} Courses</span>
                  </p>
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

export default MobileCourseInstructors;
