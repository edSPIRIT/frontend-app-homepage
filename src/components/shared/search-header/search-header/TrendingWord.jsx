import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Chip } from '@edx/paragon';
import React from 'react';

const TrendingWord = () => {
  const trendingChips = ['Python', 'Excel', 'Data Sciences', 'Marketing'];

  return (
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
  );
};

export default TrendingWord;
