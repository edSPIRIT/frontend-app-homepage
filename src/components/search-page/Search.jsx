import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Pagination } from '@edx/paragon';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import { ReactComponent as ForwardArrow } from '../../assets/forward-arrow.svg';
import CustomeDropdown from '../shared/CustomeDropdown';
import { ReactComponent as FilterList } from '../../assets/filter-list.svg';
import { COURSES_SEARCH, SEARCH_FACET_FILTERS } from '../../constants';
import CourseCard from '../shared/course-card/CourseCard';
import { ReactComponent as KeyboardArrowUp } from '../../assets/KeyboardArrowUp.svg';
import { ReactComponent as KeyboardArrowDown } from '../../assets/KeyboardArrowDown.svg';

const Search = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  return (
    <main>
      <DiscoverBanner />
      <div className="bg-light-300">
        <div className="d-flex py-4 align-items-center custom-container facets-wrapper">
          {SEARCH_FACET_FILTERS.map((facet) => (
            <Dropdown
              autoClose="outside"
              className="mb-0 mr-md-3"
              key={facet.attribute}
              onToggle={(isOpen) => setIsOpenDropDown(isOpen)}
            >
              <Dropdown.Toggle
                id="{title}-{variant}"
                variant="outline-primary"
                className="font-weight-bold"
              >
                <>
                  <span className="mr-2">
                    {facet.title}
                  </span>
                  <KeyboardArrowDown className="color-primary-500" />
                  {/* {isOpenDropDown ? <KeyboardArrowUp /> : <KeyboardArrowDown />} */}
                </>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <span className="p-2 d-block">test</span>
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </div>
      </div>

      <div className="search-body-wrapper custom-container">
        <nav aria-label="breadcrumb" className="py-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="px-1" role="presentation">
              <span className="pgn__icon">
                <ForwardArrow />
              </span>
            </li>
            <li className="breadcrumb-item">
              <Link to="/discover">Discover</Link>
            </li>
            <li className="px-1" role="presentation">
              <span className="pgn__icon">
                <ForwardArrow />
              </span>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/discover/search">Search</Link>
            </li>
          </ol>
        </nav>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p>
            <span className="total-title">Total Course:</span>
            <span className="font-weight-bold"> 2</span>
          </p>
          <CustomeDropdown
            dropdownItems={[
              'Recent',
              'Popular',
              'Title A to Z',
              'Title Z to A',
            ]}
            title="Sort by:"
            beforeIcon={<FilterList />}
          />
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
