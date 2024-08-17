/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon } from '@edx/paragon';
import { ArrowForward, KeyboardArrowDown } from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import useGetSubjects from '../../../../../hooks/useGetSubjects';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../../../redux/slice/searchQuerySlice';

const DropdownNavHeader = () => {
  const { subjects, coursesCounter } = useGetSubjects();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubjectClick = useCallback(
    (subject) => {
      dispatch(resetSearchFilters());
      dispatch(setSearchSubject([subject.title]));
      history.push('/search');
    },
    [dispatch, history],
  );

  return (
    <nav className="nav-items-wrapper">
      <Link className="nav-link-header mx-2.5" to="/overview">
        <FormattedMessage
          id="header.nav.dashboard"
          defaultMessage="Dashboard"
        />
      </Link>
      <Link className="nav-link-header mx-2.5" to="/discover">
        <FormattedMessage id="header.nav.discover" defaultMessage="Discover" />
      </Link>
      <div className="dropdown-nav-header">
        <div className="d-flex mx-2 align-items-center">
          <span className=" mr-2">
            <FormattedMessage
              id="header.dropdown.subjects"
              defaultMessage="Subjects"
            />
          </span>
          <Icon
            src={KeyboardArrowDown}
            style={{ height: '20px', width: '20px' }}
            className="arrow-down"
          />
        </div>
        <div className="dropdown-content">
          <div className="menu-tab">
            <ul className="mb-4">
              {subjects?.map((subject) => (
                <li key={subject.slug}>
                  <a
                    className="custom-link"
                    onClick={() => handleSubjectClick(subject)}
                  >
                    {subject.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-header d-flex justify-content-between">
              <div>
                <span className="text-gray-500 mr-1">
                  <FormattedMessage
                    id="totalCourse.text"
                    defaultMessage="Total Course:"
                  />
                </span>
                <span className="font-weight-bold">{coursesCounter}</span>
              </div>
              <Button
                variant="outline-primary"
                iconAfter={ArrowForward}
                className="mb-2 mb-sm-0"
                onClick={() => {
                  dispatch(resetSearchFilters());
                  history.push('/search');
                }}
              >
                <FormattedMessage
                  id="viewAllCourses.button"
                  defaultMessage="View All Courses"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="dropdown-nav-header">
        <div className="d-flex align-items-center mx-2">
          <span className=" mr-2">Programs</span>
          <Icon
            src={KeyboardArrowDown}
            style={{ height: '20px', width: '20px' }}
            className="arrow-down"
          />
        </div>
        <div className="dropdown-content">
          <div className="menu-tab">
            <ul className="list-group">
              {PROGRAMS_ITEMS_NAV.map((item) => (
                <li className="list-group-item" key={item.title}>
                  <div>
                    <a
                      className="custom-link"
                      href="/executive-education?linked_from=sitenav"
                    >
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
      </div> */}
    </nav>
  );
};

export default DropdownNavHeader;
