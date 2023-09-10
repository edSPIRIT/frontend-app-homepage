/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Dropdown, useMediaQuery } from '@edx/paragon';
import { KeyboardArrowDown, RemoveRedEye } from '@edx/paragon/icons';
import React, { useState } from 'react';

const ViewByDropDown = ({ open }) => {
  const [value, setValue] = useState('All');
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  return (
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
          <FormattedMessage id="viewBy.text" defaultMessage="View by:" />
          <span className="text-primary-500 font-weight-bold"> {value}</span>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item key="All" active={value === 'All'} eventKey="All">
          <FormattedMessage id="filter.All.text" defaultMessage="All" />
        </Dropdown.Item>
        <Dropdown.Item
          key="Courses"
          active={value === 'Courses'}
          eventKey="Courses"
        >
          <FormattedMessage id="filter.courses.text" defaultMessage="Courses" />
        </Dropdown.Item>
        <Dropdown.Item
          key="Programs"
          active={value === 'Programs'}
          eventKey="Programs"
        >
          <FormattedMessage
            id="filter.programs.text"
            defaultMessage="Programs"
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ViewByDropDown;
