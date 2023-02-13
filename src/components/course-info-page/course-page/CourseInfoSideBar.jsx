import {
  Button, Card, Icon, Skeleton,
} from '@edx/paragon';
import { Record, Event, WatchFilled } from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { INSTRUCTORS } from '../../../constants';
import imageCap from '../../../assets/card-image-cap-partner.png';

const CourseInfoSideBar = () => {
  const loading = false;
  return (
    <div className="course-info-side-wrapper">
      {loading ? (
        <div className="d-flex flex-column skeleton-wrapper">
          <Skeleton className="mb-2" height={204} />
          <div className="skeleton-logo" />
          <div className="p-4 bg-white">
            <Skeleton className="mb-1" width="60%" height={24} />
            <Skeleton className="mb-3.5" width="60%" height={24} />
            <Skeleton count={4} height={24} />
            <Skeleton className="mt-4.5" borderRadius={4} height={44} />
            <div className="mt-2 px-5">
              <Skeleton width="100%" height={24} />
            </div>
          </div>
        </div>
      ) : (
        <Card className="cards-wrapper">
          <Card.ImageCap
            src={imageCap}
            logoSrc="https://prod-discovery.edx-cdn.org/organization/logos/44022f13-20df-4666-9111-cede3e5dc5b6-2cc39992c67a.png"
            variant="top"
            alt=""
          />
          <div className="mt-4.5 px-4">
            <h2 className="mb-1">$ 225</h2>
            <span className="text-gray-500 font-sm">Lifetime access</span>
          </div>
          <Card.Section>
            <div className="d-flex flex-column  mt-auto font-sm">
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={Record} />
                <p className="program-instructors-wrapper">
                  {INSTRUCTORS.map((ins) => (
                    <Link
                      key={ins.name}
                      className="color-black"
                      to={`/bio/${ins.slug}`}
                    >
                      {ins.name}
                    </Link>
                  ))}
                </p>
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={Event} />
                <p>
                  <span className="color-black">Starting</span>{' '}
                  <span>(6 January 2022)</span>
                </p>
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={Event} />
                <p>
                  <span className="color-black">Ending</span>{' '}
                  <span>(3 August 2022)</span>
                </p>
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={WatchFilled} />
                <p>
                  <span className="color-black">2 weeks</span>{' '}
                  <span>(1-3 hours per week)</span>
                </p>
              </div>
            </div>
          </Card.Section>
          <Card.Footer>
            <div className="btn-card-container d-flex flex-column justify-content-center align-items-center">
              <Button variant="brand" href="#course" className="mb-3">
                Enroll now
              </Button>
              <p>
                <span>53,367</span>
                <span className="font-sm"> already enrolled!</span>{' '}
              </p>
            </div>
          </Card.Footer>
        </Card>
      )}
      {loading ? (
        <div className="mt-4 px-5">
          <Skeleton width="100%" height={24} />
        </div>
      ) : (
        <p className="font-sm d-flex justify-content-center py-4">
          Last update on 23 Jun 2022
        </p>
      )}
    </div>
  );
};
export default CourseInfoSideBar;
