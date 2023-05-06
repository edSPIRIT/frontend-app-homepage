import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Dropdown, Skeleton } from '@edx/paragon';
import { FilterList, KeyboardArrowDown } from '@edx/paragon/icons';
import { useDispatch } from 'react-redux';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import SearchFacets from './search/SearchFacets';
import SearchResults from './search/SearchResults';
import useGetAllCourses from '../../hooks/useGetAllCourses';
import { ascendingCourses, descendingCourses, recentCourses } from '../../redux/slice/allCoursesSlice';

const Search = () => {
  const [value, setValue] = useState('Recent');
  const [page, setPage] = useState(1);
  const { allCoursesData, isLoading } = useGetAllCourses(page);
  console.log('allCoursesData', allCoursesData);
  const dispatch = useDispatch();

  return (
    <main>
      <DiscoverBanner />
      <SearchFacets />
      <div className="custom-container pt-4.5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[
            { label: 'Home', to: '/' },
            { label: 'Discover', to: '/discover' },
          ]}
          linkAs={Link}
          activeLabel="Search"
        />
        <div className="d-flex justify-content-between align-items-center my-4">
          <p>
            <span className="total-title">Total Course:</span>
            {isLoading ? (
              <Skeleton className="ml-1" width={28} height={20} />
            ) : (
              <span className="font-weight-bold">
                {' '}
                {allCoursesData?.pagination?.count}
              </span>
            )}
          </p>
          <Dropdown className="dropdown-wrapper" onSelect={(e) => setValue(e)}>
            <Dropdown.Toggle
              id="dropdown-basic-4"
              iconAfter={KeyboardArrowDown}
              iconBefore={FilterList}
            >
              <span className="text-primary-500 dropdown-title">
                Sort by:{' '}
                <span className="text-primary-500 font-weight-bold">
                  {value}
                </span>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                key="Recent"
                active={value === 'Recent'}
                eventKey="Recent"
                onClick={() => dispatch(recentCourses())}
              >
                Recent
              </Dropdown.Item>
              <Dropdown.Item
                key="Title A to Z"
                active={value === 'Title A to Z'}
                eventKey="Title A to Z"
                onClick={() => dispatch(ascendingCourses())}
              >
                Title A to Z
              </Dropdown.Item>
              <Dropdown.Item
                key="Title Z to A"
                active={value === 'Title Z to A'}
                eventKey="Title Z to A"
                onClick={() => dispatch(descendingCourses())}
              >
                Title Z to A
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <SearchResults
          allCoursesData={allCoursesData}
          loading={isLoading}
          page={page}
          setPage={setPage}
        />
      </div>
    </main>
  );
};

export default Search;
