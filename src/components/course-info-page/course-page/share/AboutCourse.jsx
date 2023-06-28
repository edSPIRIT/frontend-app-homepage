import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';

const AboutCourse = ({ aboutCourse, loading }) => (
  <div className="about-wrapper" id="about-course">
    <h2 className="mb-3">
      <FormattedMessage
        id="courseInfo.aboutThisCourse.text"
        defaultMessage="About this course"
      />
    </h2>
    {loading ? (
      <Skeleton count={4} height={24} />
    ) : (
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="content-css"
        anchorClass="show-more-less-clickable"
        expanded={false}
        truncatedEndingComponent="... "
      >
        <div
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: aboutCourse }}
        />
      </ShowMoreText>
    )}
  </div>
);
AboutCourse.propTypes = {
  aboutCourse: PropTypes.string,
  loading: PropTypes.bool,
};
AboutCourse.defaultProps = {
  aboutCourse: '',
  loading: false,
};
export default AboutCourse;
