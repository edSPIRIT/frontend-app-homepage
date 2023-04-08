import { OverflowScroll } from '@edx/paragon';
import OverflowScrollContent from './OverflowScrollContent';

const ScrollableExplorerCourses = () => (
  <div className="scroll-courses-container">
    <OverflowScroll ariaLabel="example overflow scroll usage">
      <OverflowScrollContent />
    </OverflowScroll>
  </div>
);

export default ScrollableExplorerCourses;
