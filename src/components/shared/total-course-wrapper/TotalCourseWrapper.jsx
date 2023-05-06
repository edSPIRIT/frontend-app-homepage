import {
  Dropdown,
  Icon,
  ModalLayer,
  Skeleton,
  useToggle,
  useMediaQuery,
} from '@edx/paragon';
import {
  Check,
  Close,
  KeyboardArrowDown,
  RemoveRedEye,
} from '@edx/paragon/icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TotalCourseWrapper = ({ coursesCount, loading }) => {
  const [value, setValue] = useState('All');
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
            <span className="font-sm">view options</span>
            <Icon src={Close} className=" share-icon" onClick={close} />
          </div>
          <ul className="subject-items-list px-4 font-xl">
            <li className="d-flex justify-content-between my-2.5">
              <span>All</span>
              <Icon className="check-icon" src={Check} />
            </li>
            <li className="d-flex justify-content-between mb-2.5">
              <span>Courses</span>
              <Icon className="check-icon" src={Check} />
            </li>
            <li className="d-flex justify-content-between">
              <span>Programs</span>
              <Icon className="check-icon" src={Check} />
            </li>
          </ul>
        </div>
      </ModalLayer>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p>
          <span className="total-title">Total Course:</span>
          {loading ? (
            <Skeleton width={20} height={20} className="ml-1" />
          ) : (
            <span className="font-weight-bold"> {coursesCount}</span>
          )}
        </p>
        <Dropdown
          className="dropdown-wrapper"
          onSelect={(e) => setValue(e)}
          onClick={isMobile ? open : null}
        >
          <Dropdown.Toggle
            id="dropdown-basic-4"
            iconAfter={KeyboardArrowDown}
            iconBefore={RemoveRedEye}
          >
            <span className="text-primary-500 dropdown-title">
              View by:
              <span className="text-primary-500 font-weight-bold">
                {' '}
                {value}
              </span>
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              key="All"
              active={value === 'All'}
              eventKey="All"
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              key="Courses"
              active={value === 'Courses'}
              eventKey="Courses"
            >
              Courses
            </Dropdown.Item>
            <Dropdown.Item
              key="Programs"
              active={value === 'Programs'}
              eventKey="Programs"
            >
              Programs
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};
TotalCourseWrapper.defaultProps = {
  coursesCount: PropTypes.number,
  loading: PropTypes.bool,
};
TotalCourseWrapper.propTypes = {
  coursesCount: undefined,
  loading: undefined,
};
export default TotalCourseWrapper;
