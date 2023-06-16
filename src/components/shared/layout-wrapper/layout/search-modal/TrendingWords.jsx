import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';
import { Button } from '@edx/paragon';
import { TRENDING_WORDS } from '../../../../../utils/constants';

const TrendingWords = () => (
  <div className="d-flex flex-column px-4">
    <h4 className="mb-3 pt-4">
      <FormattedMessage
        id="searchModal.trendingKeywords.text"
        defaultMessage="Trending keywords"
      />
    </h4>
    <div>
      {TRENDING_WORDS.map((word, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Button key={i} variant="outline-primary" className="mr-2">
          {word}
        </Button>
      ))}
    </div>
  </div>
);

export default TrendingWords;
