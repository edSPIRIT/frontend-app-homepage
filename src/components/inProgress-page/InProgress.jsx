import { Pagination } from '@edx/paragon';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const InProgress = () => (
  <main>
    <div className="d-flex custom-container py-5">
      <div className="w-100">
        <TotalCourseWrapper />
        <div>
          <HorizontalCard progressValue="30" />
          <HorizontalCard />
          <HorizontalCard />
          <HorizontalCard progressValue="40" />
        </div>
        <Pagination
          className="d-flex justify-content-center"
          paginationLabel="pagination navigation"
          pageCount={20}
          onPageSelect={() => console.log('page selected')}
        />
      </div>
      {/* <AdCard /> */}
    </div>
  </main>
);
export default InProgress;
