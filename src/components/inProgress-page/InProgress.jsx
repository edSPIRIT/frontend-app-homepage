import { Dropdown, DropdownButton, Pagination } from '@edx/paragon';
import { useState } from 'react';
import HeaderDashboard from '../shared/header-dashboard/HeaderDashboard';
import HorizontalCourseCard from '../shared/horizontal-course-card/HorizontalCourseCard';

const InProgress = () => {
  const [value, setValue] = useState('All');
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  const getTitle = () => <span>View by:<span className="font-weight-bold text-primary-500">{' '}{value}</span></span>;
  return (
    <main>
      <HeaderDashboard />
      <div className="custom-container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p><span className="total-title">Total Course:</span><span className="font-weight-bold">{' '}24</span></p>
          <DropdownButton
            className="sort-btn"
            id="dropdown-basic-button"
            variant="outline-primary"
            onSelect={handleSelect}
            title={getTitle()}
          >
            <Dropdown.Item active={value === 'All'} href="#/action-1" eventKey="All">All</Dropdown.Item>
            <Dropdown.Item active={value === 'Courses'} href="#/action-2" eventKey="Courses">Courses</Dropdown.Item>
            <Dropdown.Item active={value === 'Programs'} href="#/action-3" eventKey="Programs">Programs</Dropdown.Item>
          </DropdownButton>
        </div>
        <div>
          <HorizontalCourseCard />
          <HorizontalCourseCard />
          <HorizontalCourseCard isProgram />
          <HorizontalCourseCard isProgram />
        </div>
        <Pagination
          className="d-flex justify-content-center"
          paginationLabel="pagination navigation"
          pageCount={20}
          onPageSelect={() => console.log('page selected')}
        />
      </div>
    </main>
  );
};
export default InProgress;
