/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Icon, SearchField, useMediaQuery } from '@edx/paragon';
import { useDispatch } from 'react-redux';
import { ArrowForward } from '@edx/paragon/icons';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  resetSearchFilters,
  setSearchString,
} from '../../../../redux/slice/searchQuerySlice';
import messages from '../../../../messages';
import useSearchSuggestions from '../../../../hooks/useSearchSuggestions';
import { addPage } from '../../../../redux/slice/recentPagesSlice';
import { setSearchModal } from '../../../../redux/slice/searchModalSlice';

const SearchBox = ({ intl }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const [searchSuggestionValue, setSearchSuggestionValue] = useState('');
  const { searchSuggestionsResults } = useSearchSuggestions(
    searchSuggestionValue,
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    dispatch(setSearchString(query || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleSubmitSearch = () => {
    dispatch(resetSearchFilters());
    dispatch(setSearchString(searchSuggestionValue));
    history.push(`/search?q=${searchSuggestionValue}`);
  };

  return (
    <div onClick={() => (isMobile ? dispatch(setSearchModal(true)) : null)}>
      <SearchField
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
                onMouseDown={() => {
                  dispatch(addPage(result?.data?.course_metadata));
                  history.push(
                    `/course/${result?.data?.course_metadata?.course_slug}`,
                  );
                }}
              >
                <div key={result?.data?.content?.display_name}>
                  <span>{result?.data?.content?.display_name}</span>
                  <p className="second-title-wrapper">
                    <span className="mr-1">
                      {
                        result?.data?.course_metadata?.partner?.organization
                          ?.name
                      }
                    </span>
                    .{' '}
                    <span>
                      {result.isProgram ? (
                        <FormattedMessage
                          id="program.text"
                          defaultMessage="Program"
                        />
                      ) : (
                        <FormattedMessage
                          id="course.text"
                          defaultMessage="Course"
                        />
                      )}
                    </span>
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
    </div>
  );
};

SearchBox.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchBox);
