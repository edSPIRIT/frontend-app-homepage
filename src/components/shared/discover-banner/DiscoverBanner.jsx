import { Chip, Icon, SearchField } from '@edx/paragon';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowForward } from '@edx/paragon/icons';
import { COURSES_SEARCH } from '../../../utils/constants';

const DiscoverBanner = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestion, setSearchSuggestion] = useState('');
  const trendingChips = ['Python', 'Excel', 'Data Sciences', 'Marketing'];
  const history = useHistory();
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
            Search our Catalog
          </span>
          {searchValue && (
            <span className="search-value">{`“${searchValue}”`}</span>
          )}
        </div>
        <SearchField
          className="discover-search-field"
          submitButtonLocation="external"
          onChange={(value) => setSearchSuggestion(value)}
          onSubmit={(value) => {
            setSearchValue(value);
            setSearchSuggestion('');
            history.push('/search');
          }}
          onClear={() => setSearchValue('')}
          placeholder="What do you want to learn?"
        />
        {searchSuggestion && searchSuggestion !== searchValue && (
          <div className="search-suggestion-wrapper">
            <div className="search-result-wrapper">
              {res.map((result) => (
                <div key={result.title}>
                  <span>{result.title}</span>
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
              <span className="mr-2">View all result</span>
              <Icon
                src={ArrowForward}
                style={{ height: '12px', width: '12px' }}
              />
            </Link>
          </div>
        )}
        <div className="d-flex align-items-center mt-4">
          <span className="trending-title mr-4">Trending:</span>
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
