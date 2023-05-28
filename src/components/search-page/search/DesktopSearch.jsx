import { useSelector } from 'react-redux';
import { Breadcrumb } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Link } from 'react-router-dom';
import DiscoverBanner from '../../shared/discover-banner/DiscoverBanner';
import SearchFacets from './desktop-search/SearchFacets';
import SearchResults from './share/SearchResults';
import messages from '../../../messages';
import { removeEmptyFilters } from '../../../utils/cleanedFilters';
import { isObjectEmpty } from '../../../utils/isObjectEmpty';
import SearchFilteredResults from './share/SearchFilteredResults';

const DesktopSearch = ({ intl }) => {
  const searchQueryValue = useSelector((state) => state.searchFilters);
  const cleanedFilters = removeEmptyFilters(searchQueryValue);

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
        {!isObjectEmpty(cleanedFilters) ? (
          <SearchFilteredResults />
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
