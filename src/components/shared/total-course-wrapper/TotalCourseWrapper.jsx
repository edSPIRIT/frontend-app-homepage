import { Dropdown } from '@edx/paragon';
import {
  KeyboardArrowDown,
  RemoveRedEye,
} from '@edx/paragon/icons';
import { useState } from 'react';

const TotalCourseWrapper = () => {
  const [value, setValue] = useState('All');
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p>
        <span className="total-title">Total Course:</span>
        <span className="font-weight-bold"> 2</span>
      </p>
      <Dropdown
        className="dropdown-wrapper"
        onSelect={(e) => setValue(e)}
      >
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
            key="All"
            active={value === 'All'}
            href="#/action-1"
            eventKey="All"
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            key="Course"
            active={value === 'Course'}
            href="#/action-2"
            eventKey="Course"
          >
            Course
          </Dropdown.Item>
          <Dropdown.Item
            key="Program"
            active={value === 'Program'}
            href="#/action-1"
            eventKey="Program"
          >
            Program
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TotalCourseWrapper;
