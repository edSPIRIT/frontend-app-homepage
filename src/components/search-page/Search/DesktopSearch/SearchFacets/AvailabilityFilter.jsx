import {
  Dropdown, Form, Menu, MenuItem,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { AVAILABILITY_FILTER_ITEMS } from '../../../../../utils/constants';

const AvailabilityFilter = () => (
  <Dropdown autoClose="outside" className="facet-btn  mr-3" key="subject">
    <Dropdown.Toggle
      id="{title}-{variant}"
      variant="outline-primary"
      className="font-weight-bold"
      iconAfter={KeyboardArrowDown}
    >
      <FormattedMessage
        id="search.facets.availability"
        defaultMessage="Availability"
      />
    </Dropdown.Toggle>
    <Dropdown.Menu className="facet-menu">
      <Form.Group>
        <Form.CheckboxSet
          name="color-two"
          // onChange={(e) => {
          //   toggleFacetItem(e.target.value);
          // }}
        >
          <Menu>
            {AVAILABILITY_FILTER_ITEMS.map((item) => (
              <div
                className="d-flex justify-content-between align-items-center item-wrapper"
                key={item.id}
              >
                <MenuItem className="truncate-text" as={Form.Checkbox} value={item.title}>
                  {item.title}
                </MenuItem>
                <span className="mr-3">{item.count}</span>
              </div>
            ))}
          </Menu>
        </Form.CheckboxSet>
      </Form.Group>
    </Dropdown.Menu>
  </Dropdown>
);

export default AvailabilityFilter;
