/* eslint-disable react-hooks/exhaustive-deps */
import {
  Breadcrumb, Button, Icon, Skeleton,
} from '@edx/paragon';
import {
  Share, People, BookOpen, ArrowForwardIos,
} from '@edx/paragon/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as Linkedin } from '../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../assets/facebook.svg';
import { ReactComponent as Globe } from '../../assets/language-filled.svg';
import { ReactComponent as Twitter } from '../../assets/twitter.svg';
import useGetInstructor from '../../hooks/useGetInstructor';
import CourseCardNew from '../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../shared/skeleton/CourseCardSkeleton';

const Instructor = () => {
  const [showMore, setShowMore] = useState(false);
  const [showShowMoreButton, setShowMoreButton] = useState(false);
  const pElement = useRef(null);
  const { slug } = useParams();
  const { InstructorData, loading } = useGetInstructor(slug);
  const history = useHistory();
  useEffect(() => {
    if (pElement.current?.offsetHeight >= 112) {
      setShowMoreButton(true);
    }
  }, [pElement.current?.offsetHeight]);
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
            {loading ? (
              <div className="d-flex w-100">
                <Skeleton height={256} width={256} className="mr-6" />
                <div className="w-100">
                  <Skeleton height={24} width="30%" className="mb-1" />
                  <Skeleton height={24} width="40%" className="mb-3" />
                  <Skeleton count={4} height={24} width="100%" className="" />
                  <div className="d-flex justify-content-between  mt-4">
                    <div className="d-flex ">
                      <Skeleton height={24} width={150} className="mr-4" />
                      <Skeleton height={24} width={150} className="" />
                    </div>
                    <div className="d-flex social-icon-skeleton-wrapper">
                      <Skeleton
                        count={4}
                        height={24}
                        width={24}
                        className="social-icon-skeleton mr-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="instructor-img-wrapper">
                  <img
                    className="img-instructor"
                    src={InstructorData?.image}
                    alt="instructor-img"
                  />
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>{InstructorData?.name}</h1>
                    <Icon
                      src={Share}
                      className="instructor-share-icon"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    />
                  </div>
                  <span className="short-bio mb-3">
                    {InstructorData?.short_bio}
                  </span>
                  <div>
                    <p
                      ref={pElement}
                      className={classNames('mb-2', {
                        'long-bio-instructor': !showMore,
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
                      <div className="d-flex mr-4.5 align-items-center">
                        <Icon src={People} className="mr-2" />
                        <p>
                          <span>0 Students</span>
                        </p>
                      </div>
                      <div className="d-flex">
                        <Icon src={BookOpen} className="mr-2" />
                        <p>
                          <span>{InstructorData?.courses?.length} Courses</span>
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
              </>
            )}
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
          {loading
            ? Array(4)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <CourseCardSkeleton key={i} />
              ))
            : InstructorData?.courses?.map((course) => (
              <CourseCardNew course={course} key={course.slug} />
            ))}
        </div>
        <div className="d-flex justify-content-center">
          {loading ? (
            <Skeleton width={276} height={44} className="view-all-course-btn" />
          ) : (
            <Button
              className="view-all-course-btn"
              iconAfter={ArrowForwardIos}
              onClick={() => history.push('/discover')}
            >
              View all Courses
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Instructor;
