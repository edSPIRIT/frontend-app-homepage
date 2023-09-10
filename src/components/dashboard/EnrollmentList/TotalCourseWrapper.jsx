import { Skeleton } from '@edx/paragon';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

const TotalCourseWrapper = ({ coursesCount, loading }) => (
  // const [isOpen, open, close] = useToggle(false);
  <>
    {/* TODO: we have not programs yet
      <ViewByModal isOpen={isOpen} close={close} /> */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p>
        <span className="font-sm text-gray-500">
          <FormattedMessage
            id="totalCourse.text"
            defaultMessage="Total Course:"
          />
        </span>
        {loading ? (
          <Skeleton width={20} height={20} className="ml-1" />
        ) : (
          <span className="font-weight-bold"> {coursesCount}</span>
        )}
      </p>
      {/* TODO: we have not programs yet
        <ViewByDropDown open={open} /> */}
    </div>
  </>
);
TotalCourseWrapper.defaultProps = {
  coursesCount: PropTypes.number,
  loading: PropTypes.bool,
};
TotalCourseWrapper.propTypes = {
  coursesCount: undefined,
  loading: undefined,
};
export default TotalCourseWrapper;
