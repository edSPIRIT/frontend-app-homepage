/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Dropdown,
  Icon,
  ModalLayer,
  useMediaQuery,
  useToggle,
} from '@edx/paragon';
import {
  Check,
  Close,
  FilterList,
  KeyboardArrowDown,
} from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { setSortValue } from '../../../../redux/slice/partnerSlice';
import messages from '../../../../messages';

const SortPartnersWrapper = ({ intl }) => {
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sortPartners.value);

  const handleItemClick = (sortType) => {
    dispatch(setSortValue(sortType));
  };
  return (
    <>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div aria-label="My dialog" className="  bg-white more-modal-items ">
          <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
            <span className="font-sm" />
            <Icon src={Close} className=" share-icon" onClick={close} />
          </div>
          <ul className="px-4 font-xl transform-rtl">
            <li
              onClick={() => {
                dispatch(setSortValue('recent'));
                close();
              }}
              className="d-flex justify-content-between my-2.5"
            >
              <FormattedMessage id="recent" defaultMessage="Recent" />
              {intl.formatMessage(messages[sortState])
                === intl.formatMessage(messages.recent) && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                dispatch(setSortValue('ascending'));
                close();
              }}
              className="d-flex justify-content-between mb-2.5"
            >
              <FormattedMessage id="ascending" defaultMessage="Title A to Z" />
              {intl.formatMessage(messages[sortState])
                === intl.formatMessage(messages.ascending) && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                dispatch(setSortValue('descending'));
                close();
              }}
              className="d-flex justify-content-between"
            >
              <FormattedMessage id="descending" defaultMessage="Title Z to A" />
              {intl.formatMessage(messages[sortState])
                === intl.formatMessage(messages.descending) && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
          </ul>
        </div>
      </ModalLayer>
      <Dropdown
        className="dropdown-wrapper"
        // onSelect={handleDropdownClick}
        onClick={isMobile ? open : null}
      >
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
            <FormattedMessage
              id="descending"
              defaultMessage="Title Z to A"
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

SortPartnersWrapper.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SortPartnersWrapper);
