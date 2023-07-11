import {
  Dropdown,
  Form,
  Menu,
  MenuItem,
  SearchField,
  Skeleton,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useInView } from 'react-intersection-observer';
import { setSearchPartners } from '../../../../../redux/slice/searchQuerySlice';

import messages from '../../../../../messages';
import useGetPartnersFacetInfinite from '../../../../../hooks/useGetPartnersFacetInfinite';

const PartnerFilter = ({ intl }) => {
  const { ref, inView } = useInView();
  const partners = useSelector((state) => state.searchFilters.partners);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const { partnersFilterItems, loading, isFetching } = useGetPartnersFacetInfinite(searchString, inView);

  return (
    <Dropdown autoClose="outside" className="facet-btn  mr-3" key="subject">
      <Dropdown.Toggle
        id="{title}-{variant}"
        variant="outline-primary"
        className="font-weight-bold"
        iconAfter={KeyboardArrowDown}
        disabled={partnersFilterItems.length === 0 && !searchString}
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
      <Dropdown.Menu className="facet-menu" id="partner-facet">
        {partners && (
          <SearchField
            onChange={(value) => setSearchString(value)}
            onSubmit={(value) => setSearchString(value)}
            placeholder={intl.formatMessage(messages['partners.search.find'])}
          />
        )}
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
              {partnersFilterItems.length === 0 && searchString && (
                <span className="text-gray-500 no-result">
                  <FormattedMessage
                    id="search.noResult.text"
                    defaultMessage="We couldn't find any exact matches"
                  />
                </span>
              )}
              {partnersFilterItems?.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center item-wrapper"
                  key={item.organization.id}
                >
                  <MenuItem as={Form.Checkbox} value={item.organization.name}>
                    {item.organization.name}
                  </MenuItem>
                  <span className="mr-3">{item.courses_count}</span>
                </div>
              ))}
              <div ref={ref} />
              {(loading || isFetching) && (
                <div className="d-flex pl-3 justify-content-between">
                  <div className="d-flex ">
                    <Skeleton className="mr-2" width={18} height={18} />
                    <Skeleton className="" width={90} height={18} />
                  </div>
                  <Skeleton className="mr-2" width={15} height={18} />
                </div>
              )}
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
