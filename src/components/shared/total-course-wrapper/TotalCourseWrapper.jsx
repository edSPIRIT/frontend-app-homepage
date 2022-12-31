import { Dropdown } from '@edx/paragon';
import React, { useState } from 'react';
import KeyboardArrowDown from '../../../assets/KeyboardArrowDown.svg';
import KeyboardArrowUp from '../../../assets/KeyboardArrowUp.svg';
import eyeIcon from '../../../assets/eye-icon.svg';

const TotalCourseWrapper = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [value, setValue] = useState('All');
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p>
        <span className="total-title">Total Course:</span>
        <span className="font-weight-bold"> 2</span>
      </p>
      <Dropdown
        onToggle={(isOpen) => setIsOpenDropDown(isOpen)}
        className="sort-wrapper"
        onSelect={(e) => setValue(e)}
      >
        <Dropdown.Toggle id="dropdown-basic-4">
          <>
            <img className="icon" src={eyeIcon} alt="eye-icon" />
            <span className="pl-2 pr-2 text-primary-500 dropdown-title">
              View by:
              <span className="font-weight-bold"> {value}</span>
            </span>
            <img className="icon" alt="arrow-icon" src={isOpenDropDown ? KeyboardArrowUp : KeyboardArrowDown} />
          </>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            active={value === 'All'}
            href="#/action-1"
            eventKey="All"
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            active={value === 'Courses'}
            href="#/action-2"
            eventKey="Courses"
          >
            Courses
          </Dropdown.Item>
          <Dropdown.Item
            active={value === 'Programs'}
            href="#/action-3"
            eventKey="Programs"
          >
            Programs
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TotalCourseWrapper;
