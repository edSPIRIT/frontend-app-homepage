import { Pagination } from '@edx/paragon';
import AdCard from '../shared/ad-card/adCard';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const InProgress = () => (
  <main>
    <div className="d-flex custom-container py-5">
      <div className="mr-4">
        <TotalCourseWrapper />
        <div>
          <HorizontalCard progressValue="30" />
          <HorizontalCard />
          <HorizontalCard isProgram />
          <HorizontalCard isProgram progressValue="40" />
        </div>
        <Pagination
          className="d-flex justify-content-center"
          paginationLabel="pagination navigation"
          pageCount={20}
          onPageSelect={() => console.log('page selected')}
        />
      </div>
      <AdCard />
    </div>
  </main>
);
export default InProgress;
