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
    isProgram,
    slug,
  } = info;

  return (
    <Link to={`/course/${slug}`}>
      <Card
        className={classNames('cards-wrapper', {
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
        <Card.Section>
          <div className="d-flex flex-column mb-3 mt-auto font-sm">
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={isProgram ? Groups : Person} />
              {isProgram ? (
                <p className="program-instructors-wrapper">
                  {instructor.map((ins) => (
                    <Link
                      key={ins.title}
                      className="course-text"
                      to={`/bio/${ins.link}`}
                    >
                      {ins.title}
                    </Link>
                  ))}
                </p>
              ) : (
                <Link className="course-text" to={`/bio/${instructorLink}`}>
                  {instructor}
                </Link>
              )}
              {/* <Link className="course-text" to={`/bio/${instructorLink}`}>
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
        </Card.Section>
        <Card.Footer>
          <div className="btn-card-container">
            <Button variant="primary" href="#course">
              Learn more
            </Button>
          </div>
        </Card.Footer>
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
