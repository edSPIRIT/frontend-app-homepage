import { useState } from 'react';
import { Icon, SearchField } from '@edx/paragon';
import { useDispatch } from 'react-redux';
import { ArrowForward } from '@edx/paragon/icons';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Link, useHistory } from 'react-router-dom';
import {
  resetSearchFilters,
  setSearchString,
} from '../../../redux/slice/searchQuerySlice';
import messages from '../../../messages';
import useSearchSuggestions from '../../../hooks/useSearchSuggestions';

const SearchBox = ({ intl }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchSuggestionValue, setSearchSuggestionValue] = useState('');
  const { searchSuggestionsResults, isLoading: suggestionLoading } = useSearchSuggestions(searchSuggestionValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmitSearch = () => {
    dispatch(resetSearchFilters());
    dispatch(setSearchString(searchSuggestionValue));
    history.push('/search');
  };
  return (
    <>
      <SearchField
        // autoComplete="off"
        autoComplete="false"
        className="discover-search-field"
        submitButtonLocation="external"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(value) => {
          setSearchSuggestionValue(value);
        }}
        onSubmit={handleSubmitSearch}
        onClear={() => setSearchSuggestionValue('')}
        placeholder={intl.formatMessage(messages['header.search.placeholder'])}
        buttonText={intl.formatMessage(messages['search.button.text'])}
      />
      {searchSuggestionsResults?.length > 0 && isFocused && (
        <div className="search-suggestion-wrapper">
          <div className="search-result-wrapper">
            {searchSuggestionsResults.map((result) => (
              <Link
                key={result?.data?.id}
                to={`/course/${result?.data?.course_metadata?.course_slug}`}
                onMouseDown={() => history.push(
                  `/course/${result?.data?.course_metadata?.course_slug}`,
                )}
              >
                <div key={result?.data?.content?.display_name}>
                  <span>{result?.data?.content?.display_name}</span>
                  <p className="second-title-wrapper">
                    <span>
                      {
                        result?.data?.course_metadata?.partner?.organization
                          ?.name
                      }
                    </span>
                    . <span>{result.isProgram ? 'Program' : 'Course'}</span>
                  </p>
                </div>
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
    </>
  );
};

SearchBox.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchBox);
