import { Dropdown } from '@edx/paragon';
import { KeyboardArrowDown, KeyboardArrowUp } from '@edx/paragon/icons';
import React, { useState } from 'react';

const CustomeDropdown = ({ dropdownItems, title, beforeIcon }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [value, setValue] = useState('All');
  return (
    <Dropdown
      onToggle={(isOpen) => setIsOpenDropDown(isOpen)}
      className="dropdown-wrapper"
      onSelect={(e) => setValue(e)}
    >
      <Dropdown.Toggle id="dropdown-basic-4">
        <>
          {beforeIcon}
          <span className="pl-2 pr-2 text-primary-500 dropdown-title">
            {title}
            <span className="font-weight-bold"> {value}</span>
          </span>
          {isOpenDropDown ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItems.map((dropdownItem) => (
          <Dropdown.Item
            key={dropdownItem}
            active={value === dropdownItem}
            href="#/action-1"
            eventKey={dropdownItem}
          >
            {dropdownItem}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomeDropdown;
