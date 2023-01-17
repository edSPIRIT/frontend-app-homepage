/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dropdown, Icon } from '@edx/paragon';
import PropTypes from 'prop-types';

import {
  FilterList,
  KeyboardArrowDown,
  GridView,
  ListView,
} from '@edx/paragon/icons';
import classNames from 'classnames';
import React, { useState } from 'react';

const TotalPartnersWrapper = ({ view, setView, count }) => {
  const [value, setValue] = useState('Popular');

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 mt-4.5">
      <p>
        <span className="total-title">Total partners:</span>
        <span className="font-weight-bold"> {count}</span>
      </p>
      <div className="d-flex align-items-center">
        <Dropdown
          className="dropdown-wrapper mr-4"
          onSelect={(e) => setValue(e)}
        >
          <Dropdown.Toggle
            id="dropdown-basic-4"
            iconAfter={KeyboardArrowDown}
            iconBefore={FilterList}
          >
            <span className="text-primary-500 dropdown-title">
              Sort by:
              <span className="text-primary-500 font-weight-bold">
                {' '}
                {value}
              </span>
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              key="Popular"
              active={value === 'Popular'}
              href="#/action-1"
              eventKey="Popular"
            >
              Popular
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
        <div className="d-flex align-items-center icons-view-wrapper">
          <div className="icon-view" onClick={() => setView('grid')}>
            <Icon
              className={classNames({
                active: view === 'grid',
              })}
              src={GridView}
            />
          </div>
          <div className="icon-view" onClick={() => setView('list')}>
            <Icon
              className={classNames({
                active: view === 'list',
              })}
              src={ListView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
TotalPartnersWrapper.propTypes = {
  view: PropTypes.string,
  setView: PropTypes.func,
  count: PropTypes.number,
};
TotalPartnersWrapper.defaultProps = {
  view: 'grid',
  setView: () => { },
  count: 0,
};
export default TotalPartnersWrapper;
