/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Button, Skeleton } from '@edx/paragon';
import { ArrowForwardIos } from '@edx/paragon/icons';
import { Link, useHistory, useParams } from 'react-router-dom';

import useGetInstructor from '../../hooks/useGetInstructor';
import CourseCardNew from '../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../shared/skeleton/CourseCardSkeleton';
import InstructorHeader from './instructor/InstructorHeader';

const Instructor = () => {
  const { slug } = useParams();
  const { InstructorData, loading } = useGetInstructor(slug);
  const history = useHistory();

  return (
    <main>
      <div className="breadcrumb-container">
        <div className="custom-container">
          <Breadcrumb
            ariaLabel="Breadcrumb basic"
            links={[{ label: 'Home', to: '/home' }]}
            linkAs={Link}
            activeLabel={InstructorData?.name}
          />
        </div>
      </div>
      <InstructorHeader InstructorData={InstructorData} loading={loading} />
      <div className="custom-container d-flex flex-column pb-5">
        <h2 className="d-flex popular-courses-wrapper">
          Popular<span className="highlighted ml-2">Courses</span>
        </h2>
        <div className="course-container mb-4">
          {loading
            ? Array(4)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <CourseCardSkeleton key={i} />
              ))
            : InstructorData?.courses?.map((course) => (
              <CourseCardNew course={course} key={course.slug} />
            ))}
        </div>
        <div className="d-flex justify-content-center">
          {loading ? (
            <Skeleton width={276} height={44} className="view-all-courses-btn" />
          ) : (
            <Button
              className="view-all-courses-btn"
              iconAfter={ArrowForwardIos}
              onClick={() => history.push('/discover')}
            >
              View all Courses
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Instructor;
