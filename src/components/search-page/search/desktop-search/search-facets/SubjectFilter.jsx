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
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useInView } from 'react-intersection-observer';
import { setSearchSubject } from '../../../../../redux/slice/searchQuerySlice';
import useSubjectsFacetInfinite from '../../../../../hooks/useSubjectsFacetInfinite';

const SubjectFilter = () => {
  const { ref, inView } = useInView();
  const subjects = useSelector((state) => state.searchFilters.subjects);
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState('');
  const { subjectsFilterItems, loading, isFetching } = useSubjectsFacetInfinite(
    searchString,
    inView,
  );

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
            id="search.facets.subject"
            defaultMessage="Subject"
          />
          {subjects.length > 0 && (
            <span className="font-weight-bold">: {subjects.length} items</span>
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
              if (subjects.includes(e.target.value)) {
                dispatch(
                  setSearchSubject(
                    subjects.filter((sub) => sub !== e.target.value),
                  ),
                );
              } else {
                dispatch(setSearchSubject([...subjects, e.target.value]));
              }
            }}
            value={subjects}
          >
            <Menu>
              {subjectsFilterItems?.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center item-wrapper"
                  key={item.slug}
                >
                  <MenuItem as={Form.Checkbox} value={item.title}>
                    {item.title}
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

export default SubjectFilter;
