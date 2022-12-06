import React from 'react';
import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { SUBJECTS_ITEMS } from '../../constants';

const SUBJECTS1 = SUBJECTS_ITEMS.slice(0, 5);
const SUBJECTS2 = SUBJECTS_ITEMS.slice(5);

const PopularSubjects = () => (
  <section className="popular-container">
    <div className="container">
      <h2 className="d-flex justify-content-center mb-5">
        Popular<span className="highlight-title ml-2">Subjects</span>
      </h2>
      <div className="row mb-4">
        {SUBJECTS1.map((subject) => (
          <div className="col">
            <div className="subject-container">
              <img className="subject-img" src={subject.cover} alt="" />
              <h4 className="subject-title mr-2.5">{subject.title}</h4>
              <Icon className="subject-icon" src={ArrowForwardIos} />
            </div>
          </div>
        ))}

      </div>
      <div className="row">
        {SUBJECTS2.map((subject) => (
          <div className="col">
            <div className="subject-container">
              <img className="subject-img" src={subject.cover} alt="" />
              <h4 className="subject-title mr-2.5">{subject.title}</h4>
              <Icon className="subject-icon" src={ArrowForwardIos} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularSubjects;
