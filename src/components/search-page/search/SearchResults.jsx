/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Pagination, useMediaQuery } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import CourseCardNew from '../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../shared/skeleton/CourseCardSkeleton';
import useGetAllCourses from '../../../hooks/useGetAllCourses';
import messages from '../../../messages';

const SearchResults = ({ page, setPage, intl }) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const { allCoursesData, loading } = useGetAllCourses(page);
  return (
    <>
      <div className="course-container pb-4.5">
        {/* TO DO: Do not use Array index in keys */}
        {loading
          ? Array(16)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <CourseCardSkeleton key={i} />
            ))
          : allCoursesData?.results?.map((course) => (
            <CourseCardNew
              course={course}
              key={course?.paid_course.course_id}
            />
          ))}
      </div>
      {allCoursesData?.count > 12 && (
        <Pagination
          className="d-flex justify-content-center pb-5"
          paginationLabel="pagination navigation"
          pageCount={Math.ceil(allCoursesData.count / 12)}
          onPageSelect={(e) => setPage(e)}
          currentPage={page}
          variant={isMobile ? 'reduced' : 'default'}
          buttonLabels={{
            previous: `${intl.formatMessage(
              messages['pagination.previous.button'],
            )}`,
            next: `${intl.formatMessage(messages['pagination.next.button'])}`,
            page: `${intl.formatMessage(messages['pagination.page.text'])}`,
            currentPage: `${intl.formatMessage(
              messages['pagination.currentPage.text'],
            )}`,
            pageOfCount: `${intl.formatMessage(
              messages['pagination.of.text'],
            )}`,
          }}
        />
      )}
    </>
  );
};
SearchResults.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchResults);
