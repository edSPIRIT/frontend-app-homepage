/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Button, Icon } from '@edx/paragon';
import {
  Share, People, BookOpen, ArrowForwardIos,
} from '@edx/paragon/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import classNames from 'classnames';
import { ReactComponent as Linkedin } from '../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../assets/facebook.svg';
import { ReactComponent as Globe } from '../../assets/language-filled.svg';
import { ReactComponent as Twitter } from '../../assets/twitter.svg';
import { COURSES_INFO } from '../../constants';
import CourseCard from '../shared/course-card/CourseCard';

const Instructor = () => {
  const [showMore, setShowMore] = useState(false);
  const [showShowMoreButton, setShowMoreButton] = useState(false);
  const [InstructorData, setInstructorData] = useState({});
  const pElement = useRef(null);
  const { slug } = useParams();
  useEffect(() => {
    if (pElement.current?.offsetHeight >= 112) {
      setShowMoreButton(true);
    }
  }, [pElement.current?.offsetHeight]);

  const getInstructorData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/instructor/${slug}/`,
      );
      const Data = await Res.json();
      setInstructorData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getInstructorData();
  }, [slug]);
  return (
    <main>
      <div className="d-flex instructor-header flex-column">
        <div className="custom-container">
          <Breadcrumb
            ariaLabel="Breadcrumb basic"
            links={[
              { label: 'Home', to: '/home' },
              { label: 'Partners', to: '/bio' },
            ]}
            linkAs={Link}
            activeLabel={InstructorData?.name}
          />
          <div className="d-flex mt-5.5">
            <div className="instructor-img-wrapper">
              <img
                className="img-instructor"
                src={InstructorData?.image}
                alt="instructor-img"
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <h1>{InstructorData?.name}</h1>
                <Icon src={Share} className="instructor-share-icon" />
              </div>
              <span className="short-bio mb-3">
                {InstructorData?.short_bio}
              </span>
              <div>
                <p
                  ref={pElement}
                  className={classNames('long-bio mb-2', {
                    'long-bio-break': !showMore,
                  })}
                >
                  {InstructorData?.bio}
                </p>
                {showShowMoreButton && (
                  <Button
                    variant="tertiary"
                    className="showMore-btn mb-4"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </div>
              <div className="instructor-icons-wrapper mt-auto">
                <div className="d-flex ">
                  <div className="d-flex mr-4.5">
                    <Icon src={People} className="mr-2" />
                    <p>
                      <span>0 Students</span>
                    </p>
                  </div>
                  <div className="d-flex">
                    <Icon src={BookOpen} className="mr-2" />
                    <p>
                      <span>0 Courses</span>
                    </p>
                  </div>
                </div>
                <div className="social-container">
                  {InstructorData?.twitter && (
                    <a
                      href={InstructorData?.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon className="social-icon-footer" src={Twitter} />
                    </a>
                  )}
                  {InstructorData?.linkedin && (
                    <a
                      href={InstructorData?.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon className="social-icon-footer" src={Linkedin} />
                    </a>
                  )}
                  {InstructorData?.facebook && (
                    <a
                      href={InstructorData?.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon className="social-icon-footer" src={Facebook} />
                    </a>
                  )}
                  {InstructorData?.website && (
                    <a
                      href={InstructorData?.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon src={Globe} className="social-icon-footer" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-container d-flex flex-column py-5">
        <h2 className="d-flex justify-content-center mb-4">
          <h2 className="d-flex justify-content-center mb-4">
            Popular<span className="highlighted ml-2">Courses</span>
          </h2>
        </h2>
        <div className="course-container">
          {COURSES_INFO.map((course) => (
            <CourseCard info={course} key={course.title} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Button className="view-all-course-btn" iconAfter={ArrowForwardIos}>
            View all Courses
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Instructor;
