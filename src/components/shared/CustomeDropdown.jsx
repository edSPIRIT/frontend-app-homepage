import { Dropdown } from '@edx/paragon';
import React, { useState } from 'react';
import { ReactComponent as KeyboardArrowUp } from '../../assets/KeyboardArrowUp.svg';
import { ReactComponent as KeyboardArrowDown } from '../../assets/KeyboardArrowDown.svg';

const CustomeDropdown = ({ dropdownItems, title, beforeIcon }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [value, setValue] = useState(dropdownItems[0]);
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
            <span className="text-primary-500 font-weight-bold"> {value}</span>
          </span>
          {isOpenDropDown ? <KeyboardArrowUp /> : <KeyboardArrowDown className="color-primary-500" />}
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
