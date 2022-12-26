import AdCard from '../shared/ad-card/adCard';
import HeaderDashboard from '../shared/header-dashboard/HeaderDashboard';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const Completed = () => (
  <main>
    <HeaderDashboard />
    <div className="d-flex custom-container py-5">
      <div className="mr-4">
        <TotalCourseWrapper />
        <div>
          <HorizontalCard isCompleted />
          <HorizontalCard isProgram isCompleted />
        </div>
      </div>
      <AdCard />
    </div>
  </main>
);
export default Completed;
