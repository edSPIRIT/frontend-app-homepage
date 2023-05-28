import { useDispatch, useSelector } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Dropdown } from '@edx/paragon';
import { FilterList, KeyboardArrowDown } from '@edx/paragon/icons';
import messages from '../../../../../messages';
import { setCourseSortValue } from '../../../../../redux/slice/allCoursesSlice';

const SearchSortWrapper = ({ intl }) => {
  const sortState = useSelector((state) => state.sortAllCourses.value);

  const dispatch = useDispatch();

  const handleItemClick = (sortType) => {
    dispatch(setCourseSortValue(sortType));
  };
  return (
    <Dropdown className="dropdown-wrapper">
      <Dropdown.Toggle
        id="dropdown-basic-4"
        iconAfter={KeyboardArrowDown}
        iconBefore={FilterList}
      >
        <span className="text-primary-500 dropdown-title">
          <FormattedMessage id="sortBy.text" defaultMessage="Sort by:" />
          <span className="text-primary-500 font-weight-bold">
            {' '}
            {intl.formatMessage(messages[sortState])}
          </span>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          key="recent"
          active={
            intl.formatMessage(messages[sortState])
            === intl.formatMessage(messages.recent)
          }
          eventKey={intl.formatMessage(messages.recent)}
          onClick={() => handleItemClick('recent')}
        >
          <FormattedMessage id="recent" defaultMessage="Recent" />
        </Dropdown.Item>
        <Dropdown.Item
          key="ascending"
          active={
            intl.formatMessage(messages[sortState])
            === intl.formatMessage(messages.ascending)
          }
          eventKey={intl.formatMessage(messages.ascending)}
          onClick={() => handleItemClick('ascending')}
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
          onClick={() => handleItemClick('descending')}
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
