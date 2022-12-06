import {
  Button, SearchField,
} from '@edx/paragon';
import {
  ArrowForward,
} from '@edx/paragon/icons';
import React from 'react';
import { PROGRAMS_ITEMS_NAV, SUBJECTS_ITEMS_NAV } from '../../constants';

const HeaderED = () => (
  <header>
    <div className="d-flex flex-row justify-content-between align-items-center ml-3">
      <div className="d-flex flex-row align-items-center">
        <img
          className="mr-4"
          src="https://edx-orgs-test.s3.eu-central-1.amazonaws.com/moody-toy/admin_console/images/logo.png/download.png?57"
          alt="edspirit-logo"
          width="112px"
          height="32px"
        />
        <div className="dropdown-container">
          <div className="dropdown">
            <div className="nav-item-header">
              <span className="nav-item-text d-flex align-items-center">Subjects</span>
            </div>
            <div className="dropdown-content">
              <div className="menu-tab">
                <ul className="col-ul disco-hack-main-nav-ul">
                  {SUBJECTS_ITEMS_NAV.map((item) => (
                    <li className="col-li">
                      <a className="custom-link" href="/learn/architecture">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="tab-header d-flex justify-content-between">
                  <div>
                    <span className="text-gray-500 mr-1">
                      Total Course:
                    </span>
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
          <div className="dropdown">
            <div className="nav-item-header">
              <span className="nav-item-text d-flex align-items-center">Programs</span>
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
          className="my-3"
          onSubmit={(value) => console.log(`search submitted: ${value}`)}
          placeholder="What do you want to learn?"
        />
        <div className="d-flex align-items-center">
          <Button variant="tertiary" className="mx-1 mb-2 mb-sm-0">Help</Button>
        </div>
        <div className="sign-in-container">
          <Button variant="tertiary" className="mx-1 mb-2 mb-sm-0">Sign in</Button>

          <Button variant="primary" className="mb-2 mb-sm-0 mr-4">
            join for free
          </Button>
        </div>
      </div>
    </div>
  </header>
);

HeaderED.defaultProps = {};

HeaderED.propTypes = {};

export default HeaderED;
