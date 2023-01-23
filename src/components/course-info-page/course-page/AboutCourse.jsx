import { Button } from '@edx/paragon';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

const AboutCourse = ({ Ref }) => {
  const [showMore, setShowMore] = useState(false);
  const [showShowMoreButton, setShowMoreButton] = useState(false);
  const pElement = useRef(null);
  useEffect(() => {
    if (pElement.current?.offsetHeight >= 139) {
      setShowMoreButton(true);
    }
  }, [pElement.current?.offsetHeight]);
  return (
    <div className="about-wrapper" id="about-course" ref={Ref}>
      <h2 className="mb-3">About this course</h2>
      <div>
        <p
          ref={pElement}
          className={classNames('mb-2', {
            'long-about-break': !showMore,
          })}
        >
          Blockchain is a constantly evolving technology. Essentially, it is a
          decentralized, distributed, digital ledger consisting of records called
          blocks that are used to record transactions across many computers that
          enhances reliability and security of transactions. Blockchain technology
          has improved supply chains and other transaction networks making it easier
          to interact and safely transact with others in the digital world. It
          allows us to rethink how to store, move and update data on a network. As
          the first step in IBM’s Blockchain Essentials Professional Certificate
          curriculum, this course will guide students through the basics of
          blockchain technology and covers the technical and functional components
          required to construct any blockchain solution using state-of-the-art tools
          and practices. In this course, you will learn how to design smart
          contracts, bitcoin wallets, transactions, fabricode, chain SDKs, and more.
        </p>
        {showShowMoreButton && (
        <Button
          variant="tertiary"
          className="showMore-btn mb-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show less' : 'Show more'}
        </Button>
        )}
      </div>
    </div>
  );
};

export default AboutCourse;
