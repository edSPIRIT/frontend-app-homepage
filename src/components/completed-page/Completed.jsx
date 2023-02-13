import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const Completed = () => (
  <main>
    <div className="d-flex custom-container py-5">
      <div className="w-100">
        <TotalCourseWrapper />
        <div>
          <HorizontalCard isCompleted />
          <HorizontalCard isCompleted />
        </div>
      </div>
      {/* <AdCard /> */}
    </div>
  </main>
);
export default Completed;
