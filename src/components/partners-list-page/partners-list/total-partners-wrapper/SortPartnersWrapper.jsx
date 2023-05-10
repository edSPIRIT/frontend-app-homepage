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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import {
  ascendingPartners,
  descendingPartners,
  recentPartners,
} from '../../../../redux/slice/partnerSlice';
import messages from '../../../../messages';

const SortPartnersWrapper = ({ intl }) => {
  const [value, setValue] = useState(
    intl.formatMessage(messages['recent.text']),
  );
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const dispatch = useDispatch();
  return (
    <>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div aria-label="My dialog" className="  bg-white more-modal-items ">
          <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
            <span className="font-sm" />
            <Icon src={Close} className=" share-icon" onClick={close} />
          </div>
          <ul className="subject-items-list px-4 font-xl">
            <li
              onClick={() => {
                setValue(intl.formatMessage(messages['recent.text']));
                dispatch(recentPartners());
                close();
              }}
              className="d-flex justify-content-between my-2.5"
            >
              <FormattedMessage id="recent.text" defaultMessage="Recent" />
              {value === 'Recent' && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                setValue(intl.formatMessage(messages['titleAtoZ.text']));
                dispatch(ascendingPartners());
                close();
              }}
              className="d-flex justify-content-between mb-2.5"
            >
              <FormattedMessage
                id="titleAtoZ.text"
                defaultMessage="Title A to Z"
              />
              {value === 'Title A to Z' && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                setValue(intl.formatMessage(messages['titleZtoA.text']));
                dispatch(descendingPartners());
                close();
              }}
              className="d-flex justify-content-between"
            >
              <FormattedMessage
                id="titleZtoA.text"
                defaultMessage="Title Z to A"
              />
              {value === 'Title Z to A' && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
          </ul>
        </div>
      </ModalLayer>
      <Dropdown
        className="dropdown-wrapper"
        onSelect={(e) => setValue(e)}
        onClick={isMobile ? open : null}
      >
        <Dropdown.Toggle
          id="dropdown-basic-4"
          iconAfter={KeyboardArrowDown}
          iconBefore={FilterList}
        >
          <span className="text-primary-500 dropdown-title">
            <FormattedMessage id="sortBy.text" defaultMessage="Sort by:" />
            <span className="text-primary-500 font-weight-bold"> {value}</span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            key={intl.formatMessage(messages['recent.text'])}
            active={value === 'Recent'}
            eventKey={intl.formatMessage(messages['recent.text'])}
            onClick={() => dispatch(recentPartners())}
          >
            <FormattedMessage id="recent.text" defaultMessage="Recent" />
          </Dropdown.Item>
          <Dropdown.Item
            key={intl.formatMessage(messages['titleAtoZ.text'])}
            active={value === 'Title A to Z'}
            eventKey={intl.formatMessage(messages['titleAtoZ.text'])}
            onClick={() => dispatch(ascendingPartners())}
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
            onClick={() => dispatch(descendingPartners())}
          >
            <FormattedMessage
              id="titleZtoA.text"
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
