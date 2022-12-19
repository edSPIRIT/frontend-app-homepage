import { Button, SearchField } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import React, { useEffect, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { PROGRAMS_ITEMS_NAV } from '../../constants';
import moodyLogo from '../../assets/Moody-logo.svg';

const HeaderED = () => {
  const [SubjectData, setSubjectData] = useState();
  const getSubjectData = async () => {
    try {
      const Res = await fetch(`${getConfig().LMS_BASE_URL}/admin-console/api/subject-list/`);
      const Data = await Res.json();
      setSubjectData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getSubjectData();
  }, []);
  return (
    <header>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="left-side-container">
          <div className="logo-container mr-4">
            <img
              className="h-100"
              src={moodyLogo}
              alt="edspirit-logo"
            />
          </div>
          <div className="dropdown-container">
            <div className="dropdown-nav-header">
              <div className="mx-2">
                <span className="nav-item-text">
                  Subjects
                </span>
              </div>
              <div className="dropdown-content">
                <div className="menu-tab">
                  <ul className="col-ul disco-hack-main-nav-ul mb-4">
                    {SubjectData?.map((item) => (
                      <li className="col-li">
                        <a className="custom-link" href="/learn/architecture">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-header d-flex justify-content-between">
                    <div>
                      <span className="text-gray-500 mr-1">Total Course:</span>
                      <span className="font-weight-bold">203.439</span>
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
              <div className="mx-2">
                <span className="nav-item-text">
                  Programs
                </span>
              </div>
              <div className="dropdown-content">
                <div className="menu-tab">
                  <ul className="list-group list-group-flush">
                    {PROGRAMS_ITEMS_NAV.map((item) => (
                      <li className="list-group-item">
                        <div className="content-block">
                          <a
                            className="custom-link"
                            href="/executive-education?linked_from=sitenav"
                          >
                            {item.title}
                          </a>
                          <p className="program-description">
                            {item.description}
                          </p>
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
            <div className="nav-item-link-container">
              <a className="nav-item-link-header" href="#partners">
                Partners
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <SearchField
            className="search-header"
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder="What do you want to learn?"
          />
          <div className="d-flex align-items-center">
            <Button variant="tertiary" className="mx-1">
              Help
            </Button>
          </div>
          <div className="sign-in-container">
            <Button variant="tertiary" className="mx-1">
              Sign in
            </Button>
            <Button variant="primary">
              Join
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderED;
