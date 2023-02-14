import { Pagination } from '@edx/paragon';
import useGetCourses from '../../hooks/useGetCourses';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const InProgress = () => {
  const { courses, loading } = useGetCourses();

  return (
    <main>
      <div className="d-flex custom-container py-5">
        <div className="w-100">
          <TotalCourseWrapper />

          {courses.map((course) => (
            <HorizontalCard
              progressValue={33}
              showButtons={false}
              course={course}
            />
          ))}

          <Pagination
            className="d-flex justify-content-center"
            paginationLabel="pagination navigation"
            pageCount={20}
            onPageSelect={() => console.log('page selected')}
          />
        </div>
        {/* <AdCard /> */}
      </div>
    </main>
  );
};
export default InProgress;
