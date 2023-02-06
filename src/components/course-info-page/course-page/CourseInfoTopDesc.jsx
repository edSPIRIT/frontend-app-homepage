import {
  Breadcrumb,
  Icon,
  OverlayTrigger,
  Tooltip,
} from '@edx/paragon';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Share,
  Language,
  PostOutline,
  HowToReg,
  Verified,
} from '@edx/paragon/icons';

const CourseInfoTopDesc = () => (
  <div className="course-info-top-container">
    <div className=" course-info-top-wrapper ">
      <div className="course-info-breadcrumb py-4.5">
        {/* TODO: REPLACE BUSINESS WITH ACTUAL SUBJECT */}
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[
            { label: 'Home', to: '/home' },
            { label: 'Discover', to: '/Discover' },
            { label: '‌Business', to: '/‌Business' },
          ]}
          linkAs={Link}
          activeLabel="Course info"
        />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-1">
          <h1 className="mr-4.5">
            Anatomy: Musculoskeletal and Integumentary Systems
          </h1>
          <Icon className="share-icon" src={Share} />
        </div>
        <Link to="/partners/" className="course-institution">
          Michigan X
        </Link>
      </div>
      <p className="pt-3.5">
        Get the most out of your course! Upgrade to get unlimited access to the
        course material, unlock both graded and non-graded assignments, and earn
        a verified certificate to showcase on your resume.
      </p>
      <div className="icons-wrapper d-flex color-gray-500 mt-3 pb-4.5 font-sm">
        <div className="d-flex justify-content-center align-items-center mr-4.5">
          <Icon className="mr-2" src={Language} />
          <span>English</span>
        </div>
        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip variant="light" id="tooltip-top">
              English, Arabic, Persian, France, Germany
            </Tooltip>
          )}
        >
          <div className="d-flex justify-content-center align-items-center mr-4.5">
            <Icon className="mr-2" src={PostOutline} />
            <span>English, Arabic, +3</span>
          </div>
        </OverlayTrigger>
        <div className="d-flex justify-content-center align-items-center mr-4.5">
          <Icon className="mr-2" src={HowToReg} />
          <span>Self Paced</span>
        </div>
        <div className="d-flex justify-content-center align-items-center mr-4.5">
          <Icon className="mr-2" src={Verified} />
          <span>Verified certificate</span>
        </div>
      </div>
    </div>
  </div>
);

export default CourseInfoTopDesc;
