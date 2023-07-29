/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Breadcrumb, Icon, Skeleton, useToggle,
} from '@edx/paragon';
import { ArrowBack, FilterList, Sort } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  FormattedMessage,
  FormattedNumber,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';
import messages from '../../../messages';
import FilterModal from './mobile-search/FilterModal';
import SearchFilteredResults from './share/SearchFilteredResults';
import { removeEmptyFilters } from '../../../utils/cleanedFilters';
import useSearchResults from '../../../hooks/useSearchResults';
import SortModal from './mobile-search/SortModal';

const MobileSearch = ({ intl }) => {
  const searchQueryValue = useSelector((state) => state.searchFilters);
  const cleanedFilters = removeEmptyFilters(searchQueryValue);
  const history = useHistory();
  const { searchResultsCount, isLoading } = useSearchResults();

  const sortState = useSelector((state) => state.sortSearchSlice.value);
  const [isOpen, open, close] = useToggle(false);
  const [isOpenFilter, openFilter, closeFilter] = useToggle(false);

  return (
    <>
      <FilterModal isOpenFilter={isOpenFilter} closeFilter={closeFilter} />
      <SortModal isOpen={isOpen} close={close} />

      <div className="mobile-search-container">
        <div className="d-flex px-4.5 py-3 align-items-center back-btn-wrapper">
          <Icon src={ArrowBack} onClick={history.goBack} className="mr-1.5" />
          <p className="d-flex align-items-center d-flex justify-content-center w-100">
            <h4 className="mr-1">
              {searchQueryValue.search_string ? (
                searchQueryValue.search_string
              ) : (
                <FormattedMessage
                  id="courses.text"
                  defaultMessage="{courseCount, plural, one {Course} other {Courses}}"
                  values={{
                    courseCount: searchResultsCount,
                  }}
                />
              )}
            </h4>
            (<FormattedNumber value={searchResultsCount} />)
          </p>
        </div>
        <div className="font-sm mobile-filter-sort-wrapper">
          <div
            className="d-flex align-items-center justify-content-center py-2 my-2"
            onClick={openFilter}
          >
            <Icon className="text-light-500" src={FilterList} />
            <FormattedMessage id="filters.text" defaultMessage="Filters" />
            {Object.keys(cleanedFilters).length > 0 && (
              <span className="text-brand-500 font-weight-bold ml-1">
                {`(${Object.keys(cleanedFilters).length})`}
              </span>
            )}
          </div>
          <div
            className="d-flex align-items-center justify-content-center py-2 my-2"
            onClick={open}
          >
            <Icon className="text-light-500" src={Sort} />
            <FormattedMessage id="sortBy.text" defaultMessage="Sort by:" />
            <span className="text-primary-500 font-weight-bold ml-1">
              {sortState === ''
                ? intl.formatMessage(messages.mostRelevant)
                : intl.formatMessage(messages[sortState])}
            </span>
          </div>
        </div>
        <div />
        <div className="custom-container pt-4.5">
          <div className="d-flex justify-content-between mb-4.5">
            <Breadcrumb
              ariaLabel="Breadcrumb basic"
              links={[
                {
                  label: `${intl.formatMessage(messages['breadcrumb.home'])}`,
                  to: '/',
                },
                {
                  label: `${intl.formatMessage(
                    messages['breadcrumb.discover'],
                  )}`,
                  to: '/Discover',
                },
              ]}
              linkAs={Link}
              activeLabel={intl.formatMessage(messages['search.button.text'])}
            />
            <p className="font-sm">
              <span className="text-gray-500">
                <FormattedMessage id="total.text" defaultMessage="Total:" />
              </span>
              {isLoading ? (
                <Skeleton className="ml-1" width={28} height={20} />
              ) : (
                <span className="font-weight-bold ml-1">
                  <FormattedNumber value={searchResultsCount} />
                </span>
              )}
            </p>
          </div>
          <SearchFilteredResults />
        </div>
      </div>
    </>
  );
};

MobileSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MobileSearch);
