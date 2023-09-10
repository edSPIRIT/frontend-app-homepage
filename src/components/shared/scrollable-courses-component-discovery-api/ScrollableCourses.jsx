/* eslint-disable react/prop-types */
import { OverflowScroll } from '@edx/paragon';
import OverflowScrollContent from './ScrollableCourses/OverflowScrollContent';

const ScrollableCourses = ({ courses, loading }) => (
  <div className="scroll-courses-container">
    <OverflowScroll ariaLabel="example overflow scroll usage">
      <OverflowScrollContent courses={courses} loading={loading} />
    </OverflowScroll>
  </div>
);

export default ScrollableCourses;
