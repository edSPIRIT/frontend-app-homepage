import { useSelector } from 'react-redux';
import DiscoverBanner from '../../../shared/discover-banner/DiscoverBanner';
import SearchFacets from './SearchFacets';
import SearchResults from './SearchResults';
import { Breadcrumb, Skeleton } from '@edx/paragon';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import messages from '../../../../messages';
import { Link } from 'react-router-dom';
import useSearchResults from '../../../../hooks/useSearchResults';
import CourseCardNew from '../../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../../shared/skeleton/CourseCardSkeleton';

const DesktopSearch = ({ intl }) => {
  const searchQueryValue = useSelector((state) => state.search.searchQueryValue);
  const { searchResults, searchResultsCount, isLoading } =
    useSearchResults();
  return (
    <main>
      <DiscoverBanner />
      <SearchFacets />
      <div className='custom-container pt-4.5'>
        <Breadcrumb
          ariaLabel='Breadcrumb basic'
          links={[
            { label: 'Home', to: '/' },
            {
              label: `${intl.formatMessage(messages['breadcrumb.discover'])}`,
              to: '/Discover',
            },
          ]}
          linkAs={Link}
        />

        {searchQueryValue ? (
          <>
            <p className='pt-4.5 pb-4'>
              <span className='font-sm text-gray-500'>
                <FormattedMessage id='total.text' defaultMessage='Total:' />
              </span>
              {isLoading ? (
                <Skeleton className='ml-1' width={28} height={20} />
              ) : (
                <span className='font-weight-bold'> {searchResultsCount}</span>
              )}
            </p>
            <div className='course-container pb-4.5 '>
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
        ) : (
          <SearchResults />
        )}
      </div>
    </main>
  );
};

DesktopSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DesktopSearch);
