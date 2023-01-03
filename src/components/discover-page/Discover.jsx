import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ForwardArrow } from '../../assets/forward-arrow.svg';
import PopularSubjects from '../shared/popular-subjects/PopularSubjects';
import { COURSES_INFO_TOP, TOP_PROGRAM } from '../../constants';
import CourseCard from '../shared/course-card/CourseCard';
import ProgramCard from '../shared/program-card/ProgramCard';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';

const Discover = () => (
  <main>
    <DiscoverBanner />
    <div className="discover-body-wrapper custom-container">
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
          <li className="breadcrumb-item active">
            <Link to="/bio">Discover</Link>
          </li>
        </ol>
      </nav>
      <section className="pb-6">
        <h2 className="d-flex  mb-5">
          Filter by popular subjects
        </h2>
        <PopularSubjects />
      </section>
      <section className="d-flex flex-column pb-6">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2>Explore Courses</h2>
          <Button
            variant="outline-primary"
            iconAfter={ArrowForward}
            className="view-all-btn"
          >
            View All
          </Button>
        </div>
        <h4 className="text-gray-500 font-weight-normal mb-4">Most popular course</h4>
        <div className="course-container">
          {COURSES_INFO_TOP.map((course) => (
            <CourseCard info={course} key={course.title} />
          ))}
        </div>
      </section>
      <section className="d-flex flex-column pb-6">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2>Explore Programs</h2>
          <Button
            variant="outline-primary"
            iconAfter={ArrowForward}
            className="view-all-btn"
          >
            View All
          </Button>
        </div>
        <h4 className="text-gray-500 font-weight-normal mb-4">Most popular program</h4>
        <div className="programs-container">
          {TOP_PROGRAM.map((course) => (
            <ProgramCard info={course} key={course.title} />
          ))}
        </div>
      </section>
    </div>

  </main>
);

export default Discover;
