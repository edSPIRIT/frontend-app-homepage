import { Skeleton } from '@edx/paragon';
import PropTypes from 'prop-types';

const WhatYouLearn = ({ learningItems, loading }) => (
  <div className="what-learn-wrapper " id="what-you-learn">
    <h2 className="mb-3">What you&apos;ll learn</h2>
    {loading ? (
      <Skeleton count={5} height={24} />
    ) : (
      <div className="items-wrapper">
        {learningItems
          && learningItems?.map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <ul key={i}>
              <li>{item}</li>
            </ul>
          ))}
      </div>
    )}
  </div>
);
WhatYouLearn.propTypes = {
  learningItems: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};
WhatYouLearn.defaultProps = {
  learningItems: [],
  loading: false,
};
export default WhatYouLearn;
