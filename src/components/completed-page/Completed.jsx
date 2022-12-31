import AdCard from '../shared/ad-card/adCard';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const Completed = () => (
  <main>
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
