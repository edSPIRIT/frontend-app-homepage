/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@edx/paragon';
import { Link } from 'react-router-dom';
import { Record } from '@edx/paragon/icons';
import useGetInstructorCourses from '../../../../hooks/useGetCourseInstructors';

const CourseInstructorsItem = ({ course_slug }) => {
  const { instructors } = useGetInstructorCourses(course_slug);
  return instructors?.length > 0 ? (
    <div className="d-flex align-items-start mb-2">
      <Icon className="card-icon" src={Record} />
      <p className="program-instructors-wrapper">
        {instructors?.map((ins) => (
          <Link
            key={ins.name}
            className="instructor-title text-decoration-none"
            to={`/instructor/${ins.slug}`}
          >
            {ins.name}
          </Link>
        ))}
      </p>
    </div>
  ) : null;
};

export default CourseInstructorsItem;
