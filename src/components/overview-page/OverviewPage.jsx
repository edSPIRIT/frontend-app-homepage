import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useState } from 'react';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import RecommendedPrograms from './recommended-programs/RecommendedPrograms';

const OverviewPage = () => {
  const [notEnrolled, setNotEnrolled] = useState(false);
  return (
    <main>
      {notEnrolled
        ? (
          <div className="custom-container d-flex flex-column mt-6">
            <AvatarInfo />
            <NotEnrolledCardCourse />
          </div>
        )
        : (
          <div className="d-flex flex-column">
            <div className="overview-container mt-5 custom-container">
              <AvatarInfo />
              <div className="overview-courses-wrapper">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className="text-gray-500">
                    Recent In-Progress Courses
                  </h3>
                  <Button
                    variant="outline-primary"
                    iconAfter={ArrowForward}
                    className="view-all-btn"
                    onClick={() => setNotEnrolled(true)}
                  >
                    View All
                  </Button>
                </div>
                <HorizontalCard progressValue={33} showButtons={false} />
                <HorizontalCard isProgram progressValue={60} showButtons={false} />
              </div>
              <div className="recommended-program-wrapper">
                <RecommendedPrograms />
              </div>
            </div>
            <div className="recommendationCourse-wrapper mt-6 py-6">
              <SimilarCourses />
            </div>
          </div>
        )}

    </main>
  );
};
export default OverviewPage;
