import { Chip, SearchField } from '@edx/paragon';
import React from 'react';

const DiscoverBanner = () => {
  const trendingChips = ['Python', 'Exel', 'Data Sciences', 'Marketing'];
  return (
    <div className="search-header-wrapper">
      <div className="custom-container">
        <span className="search-header mb-4.5">Search our Catalog</span>
        <SearchField
          className="discover-search-field mb-4"
          submitButtonLocation="external"
          onSubmit={(value) => console.log(`search submitted: ${value}`)}
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
