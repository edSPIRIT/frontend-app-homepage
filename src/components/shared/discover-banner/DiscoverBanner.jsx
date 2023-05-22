import { Chip } from '@edx/paragon';
import classNames from 'classnames';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';

import SearchBox from './SearchBox';

const DiscoverBanner = () => {
  const trendingChips = ['Python', 'Excel', 'Data Sciences', 'Marketing'];
  const searchSuggestionValue = useSelector(
    (state) => state.search.searchSuggestionValue,
  );
  const searchQueryValue = useSelector(
    (state) => state.search.searchQueryValue,
  );
  console.log('searchSuggestionValue', searchSuggestionValue);
  console.log('searchQueryValue', searchQueryValue);

  // const res = COURSES_SEARCH.filter((obj) => Object.values(obj)
  //   .filter((val) => typeof val === 'string')
  //   .some((val) => val.toLocaleLowerCase().includes(searchSuggestion.toLowerCase())));

  return (
    <div className="search-header-wrapper">
      <div className="custom-container py-5.5 ">
        <div className="mb-4.5">
          <span
            className={classNames('search-header mr-1', {
              'search-header-withSearch': searchQueryValue,
            })}
          >
            <FormattedMessage
              id="discover.searchOurCatalog.text"
              defaultMessage="Search our Catalog"
            />
          </span>
          {searchQueryValue && (
            <span className="search-value">{`“${searchQueryValue}”`}</span>
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
