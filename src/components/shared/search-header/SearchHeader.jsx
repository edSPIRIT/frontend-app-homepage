import classNames from 'classnames';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import SearchBox from './search-header/SearchBox';
import { resetSearchFilters } from '../../../redux/slice/searchQuerySlice';

const SearchHeader = () => {
  const searchStringValue = useSelector(
    (state) => state.searchFilters.search_string,
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/discover') {
      dispatch(resetSearchFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
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
        {/* TODO: we dont have trending word data yet
        <TrendingWord /> */}
      </div>
    </div>
  );
};

export default SearchHeader;
