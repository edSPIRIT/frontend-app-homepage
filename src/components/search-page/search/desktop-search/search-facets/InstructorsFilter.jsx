/* eslint-disable react/prop-types */
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
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import { useInView } from 'react-intersection-observer';
import { setSearchInstructors } from '../../../../../redux/slice/searchQuerySlice';
import useGetInstructorsFacetInfinite from '../../../../../hooks/useGetInstructorsFacetInfinite';
import messages from '../../../../../messages';

const InstructorsFilter = ({ intl }) => {
  const { ref, inView } = useInView();
  const instructors = useSelector((state) => state.searchFilters.instructors);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const { instructorsFilterItems, loading, isFetching } = useGetInstructorsFacetInfinite(searchString, inView);
  return (
    <Dropdown autoClose="outside" className="facet-btn  mr-3" key="subject">
      <Dropdown.Toggle
        id="{title}-{variant}"
        variant="outline-primary"
        className="font-weight-bold"
        iconAfter={KeyboardArrowDown}
        disabled={instructorsFilterItems?.length === 0 && !searchString}
      >
        <p>
          <FormattedMessage
            id="search.facets.instructor"
            defaultMessage="Instructor"
          />
          {instructors.length > 0 && (
            <span className="font-weight-bold">
              : {instructors.length} items
            </span>
          )}
        </p>
      </Dropdown.Toggle>
      <Dropdown.Menu className="facet-menu">
        <SearchField
          onChange={(value) => setSearchString(value)}
          onSubmit={(value) => setSearchString(value)}
          placeholder={intl.formatMessage(messages['partners.search.find'])}
        />
        <Form.Group>
          <Form.CheckboxSet
            name="color-two"
            onChange={(e) => {
              if (instructors.includes(e.target.value)) {
                dispatch(
                  setSearchInstructors(
                    instructors.filter((ins) => ins !== e.target.value),
                  ),
                );
              } else {
                dispatch(
                  setSearchInstructors([...instructors, e.target.value]),
                );
              }
            }}
            value={instructors}
          >
            <Menu>
              {instructorsFilterItems?.length === 0 && searchString && (
                <span className="text-gray-500 no-result">
                  <FormattedMessage
                    id="search.noResult.text"
                    defaultMessage="We couldn't find any exact matches"
                  />
                </span>
              )}
              {instructorsFilterItems?.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center item-wrapper"
                  key={item.slug}
                >
                  <MenuItem as={Form.Checkbox} value={item.name}>
                    {item.name}
                  </MenuItem>
                  <span className="mr-3">
                    <FormattedNumber value={item.courses_count} />
                  </span>
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

export default injectIntl(InstructorsFilter);
