/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import { Pagination, Skeleton, useMediaQuery } from '@edx/paragon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import CourseCardSkeleton from '../../../shared/skeleton/CourseCardSkeleton';
import CourseCard from '../../../shared/course-card/CourseCard';
import useSearchResults from '../../../../hooks/useSearchResults';
import noResult from '../../../../assets/noResult.svg';
import SearchSortWrapper from './SearchFilteredResults/SearchSortWrapper';
import { addPage } from '../../../../redux/slice/recentPagesSlice';
import messages from '../../../../messages';

const SearchFilteredResults = ({ intl }) => {
  const dispatch = useDispatch();
  const searchStringValue = useSelector(
    (state) => state.searchFilters.search_string,
  );
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get('page');
  const [page, setPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);

  const { searchResults, searchResultsCount, isLoading } = useSearchResults(page);

  useEffect(() => {
    const newPageParam = new URLSearchParams(location.search).get('page');
    const newPage = newPageParam ? parseInt(newPageParam, 10) : 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [location]);

  useEffect(() => {
    history.push(`?q=${searchStringValue}&page=${page}`);
  }, [page]);

  return (
    <>
      <div className="pt-4.5 pb-4 result-total-count-wrapper d-flex justify-content-between align-items-center">
        <p>
          <span className="font-sm text-gray-500">
            <FormattedMessage id="total.text" defaultMessage="Total:" />
          </span>
          {isLoading ? (
            <Skeleton className="ml-1" width={28} height={20} />
          ) : (
            <span className="font-weight-bold ml-1">
              <FormattedNumber value={searchResultsCount} />
            </span>
          )}
        </p>
        <SearchSortWrapper searchResultsCount={searchResultsCount} />
      </div>
      {searchResultsCount === 0 && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="img-noResult-wrapper mb-2">
            <img src={noResult} alt="no-results" />
          </div>
          <span className="text-gray-500">
            <FormattedMessage
              id="search.noResult.text"
              defaultMessage="We couldn't find any exact matches"
            />
          </span>
        </div>
      )}
      <div className="course-container pb-4.5 ">
        {/* TO DO: Do not use Array index in keys */}
        {isLoading
          ? Array(16)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <CourseCardSkeleton key={i} />
            ))
          : searchResults?.map((course) => (
            <div
              onClick={() => dispatch(addPage(course?.data?.course_metadata))}
              key={course.data.id}
            >
              <CourseCard course={course.data.course_metadata} />
            </div>
          ))}
      </div>
      <div className="pb-5.5 pt-4.5">
        {searchResultsCount > 12 && (
          <Pagination
            className="d-flex justify-content-center transform-rtl"
            paginationLabel="pagination navigation"
            pageCount={Math.ceil(searchResultsCount / 12)}
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
      </div>
    </>
  );
};

export default injectIntl(SearchFilteredResults);
