import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import React from 'react';
import CourseCardSkeleton from '../../../shared/skeleton/CourseCardSkeleton';
import CourseCardNew from '../../../shared/course-card/CourseCardNew';
import useSearchResults from '../../../../hooks/useSearchResults';
import noResult from '../../../../assets/noResult.svg';
import SearchSortWrapper from './search-result/SearchSortWrapper';

const SearchFilteredResults = () => {
  const { searchResults, searchResultsCount, isLoading } = useSearchResults();
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
            <span className="font-weight-bold"> {searchResultsCount}</span>
          )}
        </p>
        <SearchSortWrapper />
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
            <CourseCardNew
              course={course.data.course_metadata}
              key={course.data.id}
            />
          ))}
      </div>
    </>
  );
};

export default SearchFilteredResults;
