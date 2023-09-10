/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Dropdown } from '@edx/paragon';
import { FilterList, KeyboardArrowDown } from '@edx/paragon/icons';
import messages from '../../../../../messages';
import { setSearchSortValue } from '../../../../../redux/slice/sortSearchSlice';

const SearchSortWrapper = ({ intl, searchResultsCount }) => {
  const sortState = useSelector((state) => state.sortSearchSlice.value);

  const dispatch = useDispatch();

  const handleItemClick = (sortType) => {
    dispatch(setSearchSortValue(sortType));
  };
  return (
    <Dropdown className="dropdown-wrapper">
      <Dropdown.Toggle
        id="dropdown-basic-4"
        iconAfter={KeyboardArrowDown}
        iconBefore={FilterList}
        disabled={searchResultsCount === 0}
      >
        <span className="text-primary-500 dropdown-title">
          <FormattedMessage id="sortBy.text" defaultMessage="Sort by:" />
          <span className="text-primary-500 font-weight-bold">
            {' '}
            {sortState
              ? intl.formatMessage(messages[sortState])
              : intl.formatMessage(messages.mostRelevant)}
          </span>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          key="Most Relevant"
          active={sortState === ''}
          eventKey={intl.formatMessage(messages.mostRelevant)}
          onClick={() => handleItemClick('')}
        >
          <FormattedMessage
            id="mostRelevant.text"
            defaultMessage="Most Relevant"
          />
        </Dropdown.Item>
        <Dropdown.Item
          key="popular"
          active={
            intl.formatMessage(messages[sortState])
            === intl.formatMessage(messages.popular)
          }
          eventKey={intl.formatMessage(messages.popular)}
          onClick={() => handleItemClick('popular')}
        >
          <FormattedMessage id="popular.text" defaultMessage="Popular" />
        </Dropdown.Item>
        <Dropdown.Item
          key="recent"
          active={
            intl.formatMessage(messages[sortState])
            === intl.formatMessage(messages.recent)
          }
          eventKey={intl.formatMessage(messages.recent)}
          onClick={() => handleItemClick('recent')}
        >
          <FormattedMessage id="recent.text" defaultMessage="Recent" />
        </Dropdown.Item>
        <Dropdown.Item
          key="ascending"
          active={
            intl.formatMessage(messages[sortState])
            === intl.formatMessage(messages.ascending)
          }
          eventKey={intl.formatMessage(messages.ascending)}
          onClick={() => handleItemClick('A-Z')}
        >
          <FormattedMessage id="ascending" defaultMessage="Title A to Z" />
        </Dropdown.Item>
        <Dropdown.Item
          key="descending"
          active={
            intl.formatMessage(messages[sortState])
            === intl.formatMessage(messages.descending)
          }
          eventKey={intl.formatMessage(messages.descending)}
          onClick={() => handleItemClick('Z-A')}
        >
          <FormattedMessage id="descending" defaultMessage="Title Z to A" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

SearchSortWrapper.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchSortWrapper);
