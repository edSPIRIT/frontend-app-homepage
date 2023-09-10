/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Icon, SearchField } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import messages from '../../../messages';
import PartnersIconsInfoHeader from './PartnersHeader/PartnersIconsInfoHeader';

const PartnersHeader = ({
  setSuggestionQuery,
  setSearchString,
  setPage,
  suggestionQuery,
  partnersSuggestionsResults,
  partnersMetaData,
  intl,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const history = useHistory();

  const handleSubmitSearch = () => {
    setSearchString(suggestionQuery);
  };

  return (
    <div className="partners-header pt-5.5 pb-4.5">
      <div className="custom-container">
        <h1 className="pb-4">
          <FormattedMessage
            id="partners.ourPartners.text"
            defaultMessage="Our Partners"
          />
        </h1>
        <p className="banner-desc">
          <FormattedMessage
            id="partners.ourPartnersDes.text"
            defaultMessage="Our partners and collaborators help us provide excellent learning materials and high-quality online courses."
          />
        </p>
        <SearchField
          className="partners-search mt-4"
          submitButtonLocation="external"
          onChange={(value) => setSuggestionQuery(value)}
          onSubmit={(value) => {
            setPage(1);
            setSearchString(value);
          }}
          placeholder={intl.formatMessage(
            messages['partners.search.placeholder'],
          )}
          buttonText={intl.formatMessage(messages['search.button.text'])}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          inputProps={{
            autoComplete: 'off',
          }}
        />
        {partnersSuggestionsResults?.length > 0
          && isFocused
          && suggestionQuery && (
            <div className="search-suggestion-wrapper ">
              <div className="search-result-wrapper">
                {partnersSuggestionsResults.map((result) => (
                  <Link
                    key={result?.data?.id}
                    to={`/partners/${result?.organization?.short_name}`}
                    onMouseDown={() => {
                      history.push(
                        `/partners/${result?.organization?.short_name}`,
                      );
                    }}
                  >
                    <span
                      key={result?.organization?.id}
                      className="text-gray-500"
                    >
                      {result?.organization?.name}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                className="d-flex align-items-center bg-light-300 btn-wrapper"
                to="/search"
                onMouseDown={handleSubmitSearch}
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
        <PartnersIconsInfoHeader partnersMetaData={partnersMetaData} />
      </div>
    </div>
  );
};

export default injectIntl(PartnersHeader);
