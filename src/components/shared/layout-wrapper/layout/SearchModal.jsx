import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import {
  Button, FullscreenModal, Icon, SearchField,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBack, Close } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import messages from '../../../../messages';
import { TRENDING_COURSES, TRENDING_WORDS } from '../../../../utils/constants';
import { setSearchModal } from '../../../../redux/slice/searchModalSlice';
import {
  resetSearchFilters,
  setSearchString,
} from '../../../../redux/slice/searchQuerySlice';
import useSearchSuggestions from '../../../../hooks/useSearchSuggestions';
import { addPage, loadPages } from '../../../../redux/slice/recentPagesSlice';
import logoPlaceholder from '../../../../assets/place-holders/org-logo-place-holder.svg';

const SearchModal = ({ intl }) => {
  const dispatch = useDispatch();
  const isOpenSearchModal = useSelector((state) => state.searchModal.open);
  const [searchSuggestionValue, setSearchSuggestionValue] = useState('');
  const { searchSuggestionsResults } = useSearchSuggestions(searchSuggestionValue);
  const recentSearch = useSelector((state) => state.recentPages.pages);

  const history = useHistory();
  const handleSubmitSearch = () => {
    dispatch(resetSearchFilters());
    dispatch(setSearchString(searchSuggestionValue));
  };

  useEffect(() => {
    dispatch(loadPages());
  }, [dispatch]);

  return (
    <FullscreenModal
      className="search-modal"
      isOpen={isOpenSearchModal}
      onClose={() => {
        setSearchSuggestionValue('');
        dispatch(setSearchModal(false));
      }}
    >
      <div className="d-flex align-items-center search-wrapper">
        <Icon
          src={ArrowBack}
          loadPages
          onClick={() => {
            setSearchSuggestionValue('');
            dispatch(setSearchModal(false));
          }}
          className="mr-1.5"
        />
        <SearchField
          onChange={(value) => {
            setSearchSuggestionValue(value);
          }}
          onSubmit={handleSubmitSearch}
          placeholder={intl.formatMessage(
            messages['header.search.placeholder'],
          )}
        />
      </div>
      {searchSuggestionsResults?.length > 0 && (
        <div className="search-result-modal-wrapper p-4">
          {searchSuggestionsResults?.map((result) => (
            <Link
              key={result?.data?.id}
              to={`/course/${result?.data?.course_metadata?.course_slug}`}
              onMouseDown={() => {
                setSearchSuggestionValue('');
                dispatch(addPage(result?.data?.course_metadata));
                dispatch(setSearchModal(false));
                history.push(
                  `/course/${result?.data?.course_metadata?.course_slug}`,
                );
              }}
            >
              <div key={result?.data?.content?.display_name} className="py-2">
                <span className="suggestion-title pb-2">
                  {result?.data?.content?.display_name}
                </span>
                <p className="second-title-wrapper">
                  <span>
                    {result?.data?.course_metadata?.partner?.organization?.name}
                  </span>
                  . <span>{result.isProgram ? 'Program' : 'Course'}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {recentSearch.length > 0 && (
        <div className="p-4 recent-view-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>
              <FormattedMessage
                id="searchModal.recentlyViewed.text"
                defaultMessage="Recently viewed"
              />
            </h4>
            <span className="font-sm">
              <FormattedMessage id="clearAll.text" defaultMessage="Clear all" />
            </span>
          </div>
          {recentSearch.map((recentView) => (
            <div
              className="d-flex align-items-center mb-2.5"
              key={recentView?.paid_course?.course_id}
            >
              <div className="logo-img-wrapper ">
                <img
                  src={
                    recentView?.partner?.organization?.logo ?? logoPlaceholder
                  }
                  alt="org-logo"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <p className="recent-title">
                    {recentView?.additional_metadata?.display_name}
                  </p>
                  <p className="recent-institution">
                    {recentView?.partner?.organization?.name}
                  </p>
                </div>
                <Icon
                  src={Close}
                  // onClick={() => RECENTLY_VIEWED.filter(
                  //   (course) => course.title !== recentView.title,
                  // )}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex flex-column px-4">
        <h4 className="mb-3">
          <FormattedMessage id="searchModal.trendingKeywords.text" defaultMessage="Trending keywords" />
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
      <div className="d-flex flex-column px-4 mt-3">
        <h4 className="mb-3">
          <FormattedMessage id="searchModal.trendingCourses.text" defaultMessage="Trending courses" />
        </h4>
        <div>
          {TRENDING_COURSES.map((course) => (
            <div className="mb-2.5" key={course.title}>
              <p className="mb-2">{course.title}</p>
              <p className="text-gray-500 font-xs">{course.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </FullscreenModal>
  );
};

SearchModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchModal);
