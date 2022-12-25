/* eslint-disable react/prop-types */
import { Card, ProgressBar } from '@edx/paragon';
import classNames from 'classnames';
import React from 'react';

const HorizontalCourseCard = ({ isProgram }) => {
  const isSmall = false;
  return (
    <Card className={classNames('mb-4 horizontal-card-course', { 'dark-background': isProgram })} orientation={isSmall ? 'vertical' : 'horizontal'}>
      <Card.ImageCap
        src="https://picsum.photos/360/200/"
        srcAlt="Card image"
      />
      <Card.Body>
        <Card.Section>
          <h3 className="mb-1">Anatomy: Musculoskeletal and Integumentary Systems</h3>
          <p className="mb-3.5 org-title">Michigan X  •  Audit</p>
          <p className="mb-4.5 expire-title">Access expired on 22 Jul 2022</p>
          <ProgressBar now={33} label="33%" />
        </Card.Section>
      </Card.Body>

    </Card>
  );
};

export default HorizontalCourseCard;
