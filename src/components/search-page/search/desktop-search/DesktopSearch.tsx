import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Breadcrumb, Skeleton } from '@edx/paragon';
import { Link } from 'react-router-dom';
import useGetAllCourses from '../../../../hooks/useGetAllCourses';
import messages from '../../../../messages';
import DiscoverBanner from '../../../shared/discover-banner/DiscoverBanner';
import SearchFacets from './SearchFacets';
import SearchResults from './SearchResults';
import SearchSortWrapper from './SearchSortWrapper';

const DesktopSearch = ({ intl }) => {
  const { allCoursesData, isLoading } = useGetAllCourses();
  return (
    <main>
      <DiscoverBanner />
      <SearchFacets />
      <div className="custom-container pt-4.5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[
            { label: 'Home', to: '/' },
            {
              label: `${intl.formatMessage(messages['breadcrumb.discover'])}`,
              to: '/Discover',
            },
          ]}
          linkAs={Link}
        />
        <div className="d-flex justify-content-between align-items-center my-4">
          <p>
            <span className="font-sm text-gray-500">
              <FormattedMessage id="total.text" defaultMessage="Total:" />
            </span>
            {isLoading ? (
              <Skeleton className="ml-1" width={28} height={20} />
            ) : (
              <span className="font-weight-bold"> {allCoursesData?.count}</span>
            )}
          </p>
          <SearchSortWrapper />
        </div>
        <SearchResults />
      </div>
    </main>
  );
};

DesktopSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DesktopSearch);
