/* eslint-disable react/prop-types */
import React from 'react';

import { Button, Card, Icon } from '@edx/paragon';
import {
  Person, BookOpen, WatchFilled, Groups,
} from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const CourseCard = ({ info }) => {
  const {
    title,
    institution,
    cover,
    logo,
    instructor,
    instructorLink,
    lessons,
    time,
    isProgram = false,
    slug,
  } = info;

  return (
    <Link to={`/course/${slug}`}>
      <Card
        className={classNames('cards-wrapper d-flex', {
          'programs-background': isProgram,
        })}
      >
        <Card.ImageCap src={cover} logoSrc={logo} variant="top" alt="" />
        <div className="mt-4.5 px-4">
          <h4 className="mb-1 course-title">{title}</h4>
          <a className="institution-title font-sm" href="#institution">
            {institution}
          </a>
        </div>
        <div className="d-flex p-4 flex-column justify-content-between flex-grow-1">
          <div className="d-flex flex-column mt-auto font-sm">
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={isProgram ? Groups : Person} />
              {isProgram ? (
                <p className="program-instructors-wrapper">
                  {instructor.map((ins) => (
                    <Link
                      key={ins.title}
                      className="course-text"
                      to={`/instructor/${ins.link}`}
                    >
                      {ins.title}
                    </Link>
                  ))}
                </p>
              ) : (
                <Link
                  className="course-text"
                  to={`/instructor/${instructorLink}`}
                >
                  {instructor}
                </Link>
              )}
              {/* <Link className="course-text" to={`/instructor/${instructorLink}`}>
              {isProgram
                ? instructor.map((ins) => <span className="ins-title" key={instructor}>{ins}</span>)
                : instructor}
            </Link> */}
            </div>
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={BookOpen} />
              <span className="course-text">{lessons}</span>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <Icon className="card-icon" src={WatchFilled} />
              <span className="course-text">{time}</span>
            </div>
            <span className="price-title">$100 . Available Now</span>
          </div>
          <div className="btn-card-container mt-3">
            <Button variant="primary" className="learn-btn">
              Learn more
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
// CourseCard.propTypes = {
//   PrerequisiteCourses: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: string,
//       title: string,
//       institution: string,
//       cover: string,
//       logo: string,
//     }),
//   ),
// };
// Requirements.defaultProps = {
//   PrerequisiteCourses: [],
// };
export default CourseCard;
