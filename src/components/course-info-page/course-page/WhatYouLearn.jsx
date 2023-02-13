import { Skeleton } from '@edx/paragon';
import { WHAT_YOU_LEARN } from '../../../constants';

const WhatYouLearn = () => {
  const loading = false;

  return (
    <div className="what-learn-wrapper mt-5" id="what-you-learn">
      <h2 className="mb-3">What you&apos;ll learn</h2>
      {loading ? (
        <Skeleton count={5} height={24} />
      ) : (
        <div className="items-wrapper">
          <p>
            In this short introductory course, you will discover a
            diagnostic-and-action process for exercising leadership that
            explores the following foundational principles and strategies
          </p>
          {WHAT_YOU_LEARN.map((item) => (
            <ul key={item.id}>
              <li>{item.title}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhatYouLearn;
