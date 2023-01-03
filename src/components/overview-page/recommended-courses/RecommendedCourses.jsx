import React from 'react';
import { ChevronLeft, ChevronRight } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { COURSES_INFO_TOP } from '../../../constants';
import CourseCard from '../../shared/course-card/CourseCard';

const RecommendedCourses = () => (
  <section className="recommendationCourse-wrapper mt-6">
    <div className="custom-container py-6">
      <div className="d-flex pb-2 justify-content-between">
        <h4>Recommended Courses</h4>
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
    </div>

  </section>
);

export default RecommendedCourses;
