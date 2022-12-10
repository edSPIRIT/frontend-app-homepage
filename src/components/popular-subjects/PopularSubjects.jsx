import React from 'react';
import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { SUBJECTS_ITEMS } from '../../constants';

const PopularSubjects = () => (
  <section className="popular-container">
    <div className="container">
      <h2 className="d-flex justify-content-center mb-5">
        Popular<span className="highlight-title ml-2">Subjects</span>
      </h2>
      <div className="d-flex  justify-content-center flex-wrap">
        {SUBJECTS_ITEMS.map((subject) => (
          <div className="subject-container d-flex mb-4">
            <img className="subject-img" src={subject.cover} alt="" />
            <h4 className="subject-title mr-2.5">{subject.title}</h4>
            <Icon className="subject-icon" src={ArrowForwardIos} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularSubjects;
