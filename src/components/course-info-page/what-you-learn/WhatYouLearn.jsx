import { Icon } from '@edx/paragon';
import { Check } from '@edx/paragon/icons';
import { WHAT_YOU_LEARN } from '../../../constants';

const WhatYouLearn = () => (
  <div className="what-learn-wrapper mb-5">
    <h2 className="mb-3">What you&apos;ll learn</h2>
    <div className="items-wrapper">
      {WHAT_YOU_LEARN.map((item) => (
        <div className="d-flex" key={item.id}>
          <Icon className="mr-1" src={Check} />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  </div>
);

export default WhatYouLearn;
