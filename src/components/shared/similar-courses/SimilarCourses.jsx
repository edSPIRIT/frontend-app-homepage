import React from 'react';
import { ChevronLeft, ChevronRight } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { COURSES_INFO_TOP } from '../../../constants';
import CourseCard from '../course-card/CourseCard';

const SimilarCourses = () => (
  <section className="custom-container similar-courses-wrapper">
    <div className="d-flex  justify-content-between">
      <h3>Similar Courses</h3>
      <div className="icon-chevron-wrapper">
        <Icon style={{ height: '38px', width: '38px' }} src={ChevronLeft} />
        <Icon style={{ height: '38px', width: '38px' }} src={ChevronRight} />
      </div>
    </div>
    <span>Recommended based on your activity and whether you like</span>
    <div className="course-container mt-4.5">
      {COURSES_INFO_TOP.map((course) => (
        <CourseCard info={course} key={course.title} />
      ))}
    </div>
  </section>
);

export default SimilarCourses;
