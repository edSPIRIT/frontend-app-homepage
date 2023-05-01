import { Icon, Skeleton } from '@edx/paragon';
import { Check } from '@edx/paragon/icons';
import PropTypes from 'prop-types';

const WhatYouLearn = ({ learningItems, loading }) => (
  <div className="what-learn-wrapper " id="what-you-learn">
    <h2 className="mb-3">What you&apos;ll learn</h2>
    {loading ? (
      <Skeleton count={5} height={24} />
    ) : (
      <div className="mobile-icons-wrapper">
        {learningItems
            && learningItems?.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ul key={i} className=" p-0">
                <li className="d-flex">
                  <Icon src={Check} className="mr-1" />
                  <span>{item}</span>

                </li>
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
