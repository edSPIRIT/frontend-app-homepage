import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import React from 'react';
import { PROGRAMS_ITEMS_NAV } from '../../../../constants';
import useGetSubjects from '../../../../hooks/useGetSubjects';

const DropdownNavHeader = () => {
  const { subjects, coursesCounter } = useGetSubjects();

  return (
    <nav className="dropdown-container">
      <div className="dropdown-nav-header">
        <span className="nav-item-text mx-2" title="Subjects">Subjects</span>
        <div className="dropdown-content">
          <div className="menu-tab">
            <ul className="mb-4">
              {subjects?.map((subject) => (
                <li key={subject.slug}>
                  <a className="custom-link" href="/learn/architecture">
                    {subject.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-header d-flex justify-content-between">
              <div>
                <span className="text-gray-500 mr-1">Total Course:</span>
                <span className="font-weight-bold">{coursesCounter}</span>
              </div>
              <Button
                variant="outline-primary"
                iconAfter={ArrowForward}
                className="mb-2 mb-sm-0"
              >
                View All Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-nav-header">
        <span className="nav-item-text mx-2" title="Programs">Programs</span>
        <div className="dropdown-content">
          <div className="menu-tab">
            <ul className="list-group">
              {PROGRAMS_ITEMS_NAV.map((item) => (
                <li className="list-group-item" key={item.title}>
                  <div>
                    <a className="custom-link" href="/executive-education?linked_from=sitenav">
                      {item.title}
                    </a>
                    <p className="program-description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="tab-header d-flex justify-content-between">
              <span className="font-weight-bold">
                Pathways for your advancement
              </span>
              <Button variant="outline-primary" className="mb-2 mb-sm-0">
                Compare Programs
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-item-link-wrapper">
        <a href="#partners">
          Partners
        </a>
      </div>
    </nav>
  );
};

export default DropdownNavHeader;
