import { ReactComponent as EyeIcon } from '../../../assets/eye-icon.svg';
import CustomeDropdown from '../CustomeDropdown';

const TotalCourseWrapper = () => (
  <div className="d-flex justify-content-between align-items-center mb-4">
    <p>
      <span className="total-title">Total Course:</span>
      <span className="font-weight-bold"> 2</span>
    </p>
    <CustomeDropdown dropdownItems={['All', 'Course', 'Program']} title="View by:" beforeIcon={<EyeIcon />} />

  </div>
);

export default TotalCourseWrapper;
