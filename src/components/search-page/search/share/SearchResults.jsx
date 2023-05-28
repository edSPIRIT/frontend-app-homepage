/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Pagination, Skeleton, useMediaQuery } from '@edx/paragon';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import CourseCardNew from '../../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../../shared/skeleton/CourseCardSkeleton';
import useGetAllCourses from '../../../../hooks/useGetAllCourses';
import messages from '../../../../messages';
import { incrementSearchPage } from '../../../../redux/slice/searchPageSlice';
import SearchSortWrapper from './search-result/SearchSortWrapper';

const SearchResults = ({ intl }) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const { allCoursesData, loading } = useGetAllCourses();
  const dispatch = useDispatch();
  const searchPage = useSelector((state) => state.searchPage.page);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <p>
          <span className="font-sm text-gray-500">
            <FormattedMessage id="total.text" defaultMessage="Total:" />
          </span>
          {loading ? (
            <Skeleton className="ml-1" width={28} height={20} />
          ) : (
            <span className="font-weight-bold"> {allCoursesData?.count}</span>
          )}
        </p>
        <SearchSortWrapper />
      </div>
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
          className="d-flex justify-content-center pb-5 transform-rtl"
          paginationLabel="pagination navigation"
          pageCount={Math.ceil(allCoursesData.count / 12)}
          onPageSelect={(e) => dispatch(incrementSearchPage(e))}
          currentPage={searchPage}
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
