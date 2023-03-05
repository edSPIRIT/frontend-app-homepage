import { Button, Skeleton } from '@edx/paragon';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AboutCourse = ({ aboutCourse, loading }) => {
  const [showMore, setShowMore] = useState(false);
  const [showShowMoreButton, setShowMoreButton] = useState(false);
  const pElement = useRef(null);
  useEffect(() => {
    if (pElement.current?.offsetHeight >= 139) {
      setShowMoreButton(true);
    }
  }, [pElement.current?.offsetHeight]);
  return (
    <div className="about-wrapper mb-5" id="about-course">
      <h2 className="mb-3">About this course</h2>
      {loading ? (
        <Skeleton count={4} height={24} />
      ) : (
        <div>
          <p
            ref={pElement}
            className={classNames('mb-2', {
              'long-about-break': !showMore,
            })}
          >
            {aboutCourse}
          </p>
          {showShowMoreButton && (
            <Button
              variant="tertiary"
              className="showMore-btn"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
AboutCourse.propTypes = {
  aboutCourse: PropTypes.string,
  loading: PropTypes.bool,
};
AboutCourse.defaultProps = {
  aboutCourse: '',
  loading: false,
};
export default AboutCourse;
