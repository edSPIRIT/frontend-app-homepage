/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Pagination } from '@edx/paragon';
import CourseCardNew from '../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../shared/skeleton/CourseCardSkeleton';

const SearchResults = ({
  allCoursesData, loading, page, setPage,
}) => (
  <>
    <div className="course-container">
      {/* TO DO: Do not use Array index in keys */}
      {loading
        ? Array(16)
          .fill(1)
          .map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <CourseCardSkeleton key={i} />
          ))
        : allCoursesData?.results?.map((course) => (
          <CourseCardNew course={course} key={course.course_slug} />
        ))}
    </div>
    {allCoursesData?.pagination?.num_pages > 1 && (
      <Pagination
        className="d-flex justify-content-center pt-4.5 pb-5"
        paginationLabel="pagination navigation"
        pageCount={allCoursesData?.pagination?.num_pages}
        onPageSelect={(e) => setPage(e)}
        currentPage={page}
      />
    )}
  </>
);
export default SearchResults;
