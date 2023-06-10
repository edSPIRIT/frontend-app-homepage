import {
  Dropdown, Form, Menu, MenuItem, SearchField,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { setSearchPartners } from '../../../../../redux/slice/searchQuerySlice';
import useGetPartnersFacet from '../../../../../hooks/useGetPartnersFacet';
import messages from '../../../../../messages';

const PartnerFilter = ({ intl }) => {
  const partners = useSelector((state) => state.searchFilters.partners);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const { partnersData, loading } = useGetPartnersFacet(1, searchString);

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
          {partners.length > 0 && (
            <span className="font-weight-bold">: {partners.length} items</span>
          )}
        </p>
      </Dropdown.Toggle>
      <Dropdown.Menu className="facet-menu">
        <SearchField
          onChange={(value) => setSearchString(value)}
          onSubmit={(value) => setSearchString(value)}
          placeholder={intl.formatMessage(
            messages['partners.search.find'],
          )}

        />
        <Form.Group>
          <Form.CheckboxSet
            name="color-two"
            onChange={(e) => {
              if (partners.includes(e.target.value)) {
                dispatch(
                  setSearchPartners(
                    partners.filter((part) => part !== e.target.value),
                  ),
                );
              } else {
                dispatch(setSearchPartners([...partners, e.target.value]));
              }
            }}
            value={partners}
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

PartnerFilter.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PartnerFilter);
