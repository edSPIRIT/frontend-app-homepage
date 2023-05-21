import { Chip, Icon, SearchField } from '@edx/paragon';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowForward } from '@edx/paragon/icons';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { COURSES_SEARCH } from '../../../utils/constants';
import messages from '../../../messages';
import { setSearchQuery } from '../../../redux/slice/searchQuerySlice';
import useGetSearchResults from '../../../hooks/useGetSearchResults';

const DiscoverBanner = ({ intl }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestion, setSearchSuggestion] = useState('');
  const trendingChips = ['Python', 'Excel', 'Data Sciences', 'Marketing'];
  const history = useHistory();
  const dispatch = useDispatch();
  const { searchResults, searchResultsCount, isLoading } = useGetSearchResults();
  console.log('searchResultsCount', searchResultsCount, searchResults, !!searchResults);
  // const searchQuery = useSelector((state) => state.searchQuery.value);
  // console.log('searchQuery1', searchQuery);
  const res = COURSES_SEARCH.filter((obj) => Object.values(obj)
    .filter((val) => typeof val === 'string')
    .some((val) => val.toLocaleLowerCase().includes(searchSuggestion.toLowerCase())));

  return (
    <div className="search-header-wrapper">
      <div className="custom-container py-5.5 ">
        <div className="mb-4.5">
          <span
            className={classNames('search-header mr-1', {
              'search-header-withSearch': searchValue,
            })}
          >
            <FormattedMessage
              id="discover.searchOurCatalog.text"
              defaultMessage="Search our Catalog"
            />
          </span>
          {searchValue && (
            <span className="search-value">{`“${searchValue}”`}</span>
          )}
        </div>
        <SearchField
          className="discover-search-field"
          submitButtonLocation="external"
          onChange={(value) => {
            setSearchSuggestion(value);
            dispatch(setSearchQuery(value));
          }}
          onSubmit={(value) => {
            setSearchValue(value);
            setSearchSuggestion('');
            history.push('/search');
          }}
          onClear={() => setSearchValue('')}
          placeholder={intl.formatMessage(
            messages['header.search.placeholder'],
          )}
          buttonText={intl.formatMessage(messages['search.button.text'])}
        />
        {searchResults?.length > 0 && (
          <div className="search-suggestion-wrapper">
            <div className="search-result-wrapper">
              {searchResults.map((result) => (
                <div key={result?.data?.content?.display_name}>
                  <span>{result?.data?.content?.display_name}</span>
                  <p className="second-title-wrapper">
                    <span>{result.institution}</span> .{' '}
                    <span>{result.isProgram ? 'Program' : 'Course'}</span>
                  </p>
                </div>
              ))}
            </div>
            <Link
              className="d-flex align-items-center bg-light-300 btn-wrapper"
              to="/search"
            >
              <span className="mr-2">
                <FormattedMessage
                  id="discover.viewAllResult.text"
                  defaultMessage="View all result"
                />
              </span>
              <Icon
                src={ArrowForward}
                style={{ height: '12px', width: '12px' }}
              />
            </Link>
          </div>
        )}
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
DiscoverBanner.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DiscoverBanner);
