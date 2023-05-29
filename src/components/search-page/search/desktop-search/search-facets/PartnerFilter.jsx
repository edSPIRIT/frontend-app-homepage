import {
  Dropdown, Form, Menu, MenuItem, SearchField,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { setSearchPartner } from '../../../../../redux/slice/searchQuerySlice';
import useGetPartnersFacet from '../../../../../hooks/useGetPartnersFacet';

const PartnerFilter = () => {
  const partner = useSelector((state) => state.searchFilters.partner);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const { partnersData, loading } = useGetPartnersFacet(searchString);

  return (
    <Dropdown autoClose="outside" className="facet-btn  mr-3" key="subject">
      <Dropdown.Toggle
        id="{title}-{variant}"
        variant="outline-primary"
        className="font-weight-bold"
        iconAfter={KeyboardArrowDown}
      >
        <p>
          <FormattedMessage
            id="search.facets.partner"
            defaultMessage="Partner"
          />
          {partner.length > 0 && (
            <span className="font-weight-bold">: {partner.length} items</span>
          )}
        </p>
      </Dropdown.Toggle>
      <Dropdown.Menu className="facet-menu">
        <SearchField
          onChange={(value) => setSearchString(value)}
          onSubmit={(value) => setSearchString(value)}
          placeholder="Find a ..."
        />
        <Form.Group>
          <Form.CheckboxSet
            name="color-two"
            onChange={(e) => {
              if (partner.includes(e.target.value)) {
                dispatch(
                  setSearchPartner(
                    partner.filter((part) => part !== e.target.value),
                  ),
                );
              } else {
                dispatch(setSearchPartner([...partner, e.target.value]));
              }
            }}
            value={partner}
          >
            <Menu>
              {partnersData?.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center item-wrapper"
                  key={item.organization.id}
                >
                  <MenuItem as={Form.Checkbox} value={item.organization.name}>
                    {item.organization.name}
                  </MenuItem>
                  <span className="mr-2.5">{item.courses_count}</span>
                </div>
              ))}
            </Menu>
          </Form.CheckboxSet>
        </Form.Group>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PartnerFilter;
