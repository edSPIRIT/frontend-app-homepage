import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Dropdown, Skeleton } from '@edx/paragon';
import { FilterList, KeyboardArrowDown } from '@edx/paragon/icons';
import { useDispatch } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import SearchFacets from './search/SearchFacets';
import SearchResults from './search/SearchResults';
import useGetAllCourses from '../../hooks/useGetAllCourses';
import {
  ascendingCourses,
  descendingCourses,
  recentCourses,
} from '../../redux/slice/allCoursesSlice';
import messages from '../../messages';

const Search = ({ intl }) => {
  const [value, setValue] = useState(
    intl.formatMessage(messages['recent.text']),
  );
  const [page, setPage] = useState(1);
  const { allCoursesData, isLoading } = useGetAllCourses(page);
  const dispatch = useDispatch();
  return (
    <main>
      <DiscoverBanner />
      <SearchFacets />
      <div className="custom-container pt-4.5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[
            { label: 'Home', to: '/' },
            {
              label: `${intl.formatMessage(messages['breadcrumb.discover'])}`,
              to: '/Discover',
            },
          ]}
          linkAs={Link}
          activeLabel={intl.formatMessage(messages['search.button.text'])}
        />
        <div className="d-flex justify-content-between align-items-center my-4">
          <p>
            <span className="total-title">
              <FormattedMessage id="total.text" defaultMessage="Total:" />
            </span>
            {isLoading ? (
              <Skeleton className="ml-1" width={28} height={20} />
            ) : (
              <span className="font-weight-bold">
                {' '}
                {allCoursesData?.pagination?.count}
              </span>
            )}
          </p>
          <Dropdown className="dropdown-wrapper" onSelect={(e) => setValue(e)}>
            <Dropdown.Toggle
              id="dropdown-basic-4"
              iconAfter={KeyboardArrowDown}
              iconBefore={FilterList}
            >
              <span className="text-primary-500 dropdown-title">
                <FormattedMessage id="sortBy.text" defaultMessage="Sort by:" />
                <span className="text-primary-500 font-weight-bold">
                  {value}
                </span>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                key={intl.formatMessage(messages['recent.text'])}
                active={value === 'Recent'}
                eventKey={intl.formatMessage(messages['recent.text'])}
                onClick={() => dispatch(recentCourses())}
              >
                <FormattedMessage id="recent.text" defaultMessage="ًRecent" />
              </Dropdown.Item>
              <Dropdown.Item
                key={intl.formatMessage(messages['titleAtoZ.text'])}
                active={value === 'Title A to Z'}
                eventKey={intl.formatMessage(messages['titleAtoZ.text'])}
                onClick={() => dispatch(ascendingCourses())}
              >
                <FormattedMessage
                  id="titleAtoZ.text"
                  defaultMessage="Title A to Z"
                />
              </Dropdown.Item>
              <Dropdown.Item
                key={intl.formatMessage(messages['titleZtoA.text'])}
                active={value === 'Title Z to A'}
                eventKey={intl.formatMessage(messages['titleZtoA.text'])}
                onClick={() => dispatch(descendingCourses())}
              >
                <FormattedMessage
                  id="titleZtoA.text"
                  defaultMessage="Title Z to A"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <SearchResults page={page} setPage={setPage} />
      </div>
    </main>
  );
};

Search.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Search);
