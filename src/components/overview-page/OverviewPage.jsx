import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useState } from 'react';
import HeaderDashboard from '../shared/header-dashboard/HeaderDashboard';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import RecommendationCourse from './recommendation-course/RecommendationCourse';
import RecommendationProgram from './recommendation-program/RecommendationProgram';

const OverviewPage = () => {
  const [notEnrolled, setNotEnrolled] = useState(false);
  return (
    <main>
      <HeaderDashboard />
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
                <RecommendationProgram />
              </div>
            </div>
            <RecommendationCourse />
          </div>
        )}

    </main>
  );
};
export default OverviewPage;
