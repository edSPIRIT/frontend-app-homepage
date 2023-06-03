import { Chip } from '@edx/paragon';
import classNames from 'classnames';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';

import SearchBox from './SearchBox';

const DiscoverBanner = () => {
  const trendingChips = ['Python', 'Excel', 'Data Sciences', 'Marketing'];

  const searchStringValue = useSelector(
    (state) => state.searchFilters.search_string,
  );

  return (
    <div className="search-header-wrapper">
      <div className="custom-container  ">
        <div className="mb-4.5">
          <span
            className={classNames('search-header mr-1', {
              'search-header-withSearch': searchStringValue,
            })}
          >
            <FormattedMessage
              id="discover.searchOurCatalog.text"
              defaultMessage="Search our Catalog"
            />
          </span>
          {searchStringValue && (
            <span className="search-value">{`“${searchStringValue}”`}</span>
          )}
        </div>
        <SearchBox />
        <div className="d-flex align-items-center mt-4">
          <span className="trending-title mr-4">
            <FormattedMessage
              id="discover.trending.text"
              defaultMessage="Trending:"
            />
          </span>
          <div>
            {trendingChips.map((chip) => (
              <Chip key={chip} className="chip-trend mr-2">
                {chip}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverBanner;
