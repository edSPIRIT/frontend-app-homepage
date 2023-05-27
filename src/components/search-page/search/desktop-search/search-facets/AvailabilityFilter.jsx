import {
  Dropdown, Form, Menu, MenuItem, SearchField,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { AVAILABILITY_FILTER_ITEMS } from '../../../../../utils/constants';

const AvailabilityFilter = () => {
  const filters = useSelector((state) => state.searchFilters);

  return (
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
      <Dropdown.Menu>
        <SearchField
          onSubmit={(value) => console.log(`search submitted: ${value}`)}
          placeholder="Find a ..."
        />
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
                  <MenuItem as={Form.Checkbox} value={item.title}>
                    {item.title}
                  </MenuItem>
                  <span className="mr-2.5">{item.count}</span>
                </div>
              ))}
            </Menu>
          </Form.CheckboxSet>
        </Form.Group>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvailabilityFilter;
