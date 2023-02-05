import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Dropdown, Pagination } from '@edx/paragon';
import {
  FilterList,
  KeyboardArrowDown,
} from '@edx/paragon/icons';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import CourseCard from '../shared/course-card/CourseCard';
import SearchFacets from './search-facets/SearchFacets';
import { COURSES_SEARCH } from '../../constants';

const Search = () => {
  const [value, setValue] = useState('Recent');
  return (
    <main>
      <DiscoverBanner />
      <SearchFacets />
      <div className="custom-container pt-4.5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[
            { label: 'Home', to: '/home' },
            { label: 'Discover', to: '/discover' },
          ]}
          linkAs={Link}
          activeLabel="Search"
        />
        <div className="d-flex justify-content-between align-items-center my-4">
          <p>
            <span className="total-title">Total Course:</span>
            <span className="font-weight-bold"> 2</span>
          </p>
          <Dropdown
            className="dropdown-wrapper"
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
                key="Recent"
                active={value === 'Recent'}
                href="#/action-1"
                eventKey="Recent"
              >
                Recent
              </Dropdown.Item>
              <Dropdown.Item
                key="Popular"
                active={value === 'Popular'}
                href="#/action-2"
                eventKey="Popular"
              >
                Popular
              </Dropdown.Item>
              <Dropdown.Item
                key="Title A to Z"
                active={value === 'Title A to Z'}
                href="#/action-1"
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
        </div>
        <div className="course-container">
          {COURSES_SEARCH.map((course) => (
            <CourseCard info={course} key={course.title} />
          ))}
        </div>
        <Pagination
          className="d-flex justify-content-center pt-4.5 pb-5"
          paginationLabel="pagination navigation"
          pageCount={20}
          onPageSelect={() => console.log('page selected')}
        />
      </div>
    </main>
  );
};

export default Search;
