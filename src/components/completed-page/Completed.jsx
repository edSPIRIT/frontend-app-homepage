import useGetCourses from '../../hooks/useGetCourses';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import HorizontalCardSkeleton from '../shared/horizontal-card/HorizontalCardSkeleton';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const Completed = () => {
  const { courses, loading } = useGetCourses();

  return (
    <main>
      <div className="d-flex custom-container py-5">
        <div className="w-100">
          <TotalCourseWrapper
            coursesCount={courses?.length}
            loading={loading}
          />
          {loading
            ? Array(4)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <HorizontalCardSkeleton key={i} />
              ))
            : courses.map((course) => (
              <HorizontalCard
                key={course.course_id}
                progressValue={33}
                showButtons={false}
                course={course}
                isCompleted
              />
            ))}
        </div>
        {/* <AdCard /> */}
      </div>
    </main>
  );
};
export default Completed;
