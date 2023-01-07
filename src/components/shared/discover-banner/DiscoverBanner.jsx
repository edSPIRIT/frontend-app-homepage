import { Chip, SearchField } from '@edx/paragon';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const DiscoverBanner = () => {
  const [searchValue, setSearchValue] = useState('');
  console.log('searchValue', searchValue);
  const trendingChips = ['Python', 'Excel', 'Data Sciences', 'Marketing'];
  const history = useHistory();
  return (
    <div className="search-header-wrapper">
      <div className="custom-container py-5.5 ">
        <div className="mb-4.5 search-value-wrapper">
          <span className={classNames('search-header mr-1', {
            'search-header-withSearch': searchValue,
          })}
          >Search our Catalog
          </span>
          {searchValue && (
          <span className="search-value">{`“${searchValue}”`}</span>
          )}
        </div>
        <SearchField
          className="discover-search-field mb-4"
          submitButtonLocation="external"
          onSubmit={(value) => {
            setSearchValue(value);
            history.push('/discover/search');
          }}
          onClear={() => setSearchValue('')}
          placeholder="What do you want to learn?"
        />
        <div className="d-flex align-items-center">
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
