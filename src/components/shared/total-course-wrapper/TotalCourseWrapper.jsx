import { Dropdown, Skeleton } from '@edx/paragon';
import { KeyboardArrowDown, RemoveRedEye } from '@edx/paragon/icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TotalCourseWrapper = ({ coursesCount, loading }) => {
  const [value, setValue] = useState('Recent');
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p>
        <span className="total-title">Total Course:</span>
        {loading ? (
          <Skeleton width={20} height={20} className="ml-1" />
        ) : (
          <span className="font-weight-bold"> {coursesCount}</span>
        )}
      </p>
      <Dropdown className="dropdown-wrapper" onSelect={(e) => setValue(e)}>
        <Dropdown.Toggle
          id="dropdown-basic-4"
          iconAfter={KeyboardArrowDown}
          iconBefore={RemoveRedEye}
        >
          <span className="text-primary-500 dropdown-title">
            View by:
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
    </div>
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
