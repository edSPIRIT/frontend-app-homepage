import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, Dropdown, Skeleton,
} from '@edx/paragon';
import { FilterList, KeyboardArrowDown } from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import SearchFacets from './search/SearchFacets';
import SearchResults from './search/SearchResults';

const Search = () => {
  const [value, setValue] = useState('Recent');
  // const { allCoursesData, loading } = useGetAllCourses();
  const [page, setPage] = useState(1);

  const fetchProjects = (pageNum = 1) => fetch(
    `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/course-list/?page=${pageNum}`,
  ).then((res) => res.json());

  const {
    isLoading, isError, error, data, isFetching, isPreviousData,
  } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true,
  });

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
            {isLoading ? (
              <Skeleton className="ml-1" width={28} height={20} />
            ) : (
              <span className="font-weight-bold"> {data?.results?.length}</span>
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
                href="#/action-1"
                eventKey="Recent"
              >
                Recent
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
        <SearchResults allCoursesData={data} loading={isLoading} setPage={setPage} />

      </div>
    </main>
  );
};

export default Search;
