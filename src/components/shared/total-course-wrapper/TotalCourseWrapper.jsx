import { Dropdown, DropdownButton } from '@edx/paragon';
import React, { useState } from 'react';

const TotalCourseWrapper = () => {
  const [value, setValue] = useState('All');
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  const getTitle = () => <span>View by:<span className="font-weight-bold text-primary-500">{' '}{value}</span></span>;
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p>
        <span className="total-title">Total Course:</span>
        <span className="font-weight-bold"> 2</span>
      </p>
      <DropdownButton
        className="sort-btn"
        id="dropdown-basic-button"
        variant="outline-primary"
        onSelect={handleSelect}
        title={getTitle()}
      >
        <Dropdown.Item active={value === 'All'} href="#/action-1" eventKey="All">
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
      </DropdownButton>
    </div>
  );
};

export default TotalCourseWrapper;
