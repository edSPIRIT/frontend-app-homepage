import useGetCourses from '../../hooks/useGetCourses';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import HorizontalCardSkeleton from '../shared/horizontal-card/HorizontalCardSkeleton';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const InProgress = () => {
  const { courses, loading } = useGetCourses();

  return (
    <main>
      <div className="d-flex custom-container py-5">
        <div className="w-100">
          <TotalCourseWrapper coursesCount={courses?.length} loading={loading} />
          {loading
            ? Array(4)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <HorizontalCardSkeleton key={i} />
              ))
            : courses.map((course) => (
              <HorizontalCard
                progressValue={33}
                showButtons={false}
                course={course}
                key={course.course_id}
              />
            ))}
          {/*
          <Pagination
            className="d-flex justify-content-center"
            paginationLabel="pagination navigation"
            pageCount={20}
            onPageSelect={() => console.log('page selected')}
          /> */}
        </div>
        {/* <AdCard /> */}
      </div>
    </main>
  );
};
export default InProgress;
