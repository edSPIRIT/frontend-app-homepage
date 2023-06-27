/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import logoPlaceholder from '../../../assets/place-holders/org-logo-place-holder.svg';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';
import FeaturedSubjectsSkeleton from './featured-subjects/FeaturedSubjectsSkeleton';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

const FeaturedSubjects = ({ featuredSubjects, loading }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (subject) => {
    dispatch(resetSearchFilters());
    dispatch(setSearchSubject([subject.title]));
    history.push('/search');
  };
  return (
    <div className="custom-container pt-5 explore-container">
      <div className="d-flex justify-content-between">
        <h2>
          <FormattedMessage
            id="discover.featuredSubjects.text"
            defaultMessage="Featured Subjects"
          />
        </h2>
      </div>
      <div className="subjects-container pt-4">
        {loading
          ? Array(10)
            .fill(1)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <FeaturedSubjectsSkeleton key={i} />
            ))
          : featuredSubjects?.map((subject) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              className="subject-wrapper d-flex flex-column"
              key={subject.slug}
              onClick={() => handleClick(subject)}
            >
              <div className="subject-img-wrapper">
                <img src={subject.image ?? logoPlaceholder} alt="subject" />
              </div>
              <span className="font-sm">
                {capitalizeFirstLetter(subject.title)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedSubjects;
