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

const SortPartnersWrapper = () => {
  const [value, setValue] = useState('Recent');
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div
          role="dialog"
          aria-label="My dialog"
          className="  bg-white more-modal-items "
        >
          <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
            <span className="font-sm" />
            <Icon src={Close} className=" share-icon" onClick={close} />
          </div>
          <ul className="subject-items-list px-4 font-xl">
            <li
              onClick={() => {
                setValue('Recent');
                close();
              }}
              className="d-flex justify-content-between my-2.5"
            >
              <span>Recent</span>
              {value === 'Recent' && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                setValue('Title A to Z');
                close();
              }}
              className="d-flex justify-content-between mb-2.5"
            >
              <span>Title A to Z</span>
              {value === 'Title A to Z' && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                setValue('Title Z to A');
                close();
              }}
              className="d-flex justify-content-between"
            >
              <span>Title Z to A</span>
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
            Sort by:
            <span className="text-primary-500 font-weight-bold"> {value}</span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            key="Recent"
            active={value === 'Recent'}
            href="#/action-1"
            eventKey="Recent"
          >
            Recent
          </Dropdown.Item>
          <Dropdown.Item
            key="Title A to Z"
            active={value === 'Title A to Z'}
            href="#/action-2"
            eventKey="Title A to Z"
          >
            Title A to Z
          </Dropdown.Item>
          <Dropdown.Item
            key="Title Z to A"
            active={value === 'Title Z to A'}
            href="#/action-1"
            eventKey="Title Z to A"
          >
            Title Z to A
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SortPartnersWrapper;
