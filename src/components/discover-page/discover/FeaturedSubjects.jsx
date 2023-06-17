/* eslint-disable react/prop-types */
import React from 'react';
import { Skeleton } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import logoPlaceholder from '../../../assets/place-holders/org-logo-place-holder.svg';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';

const FeaturedSubjects = ({ featuredSubjects, loading }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="custom-container pt-5 explore-container">
      <div className="d-flex justify-content-between">
        <h2>
          <FormattedMessage
            id="discover.featuredSubjects.text"
            defaultMessage="Featured subjects"
          />
        </h2>
      </div>
      <div className="subjects-container pt-4">
        {loading
          ? Array(10)
            .fill(1)
            .map((_, i) => (
              <div
                className="d-flex flex-column bg-light-200 align-items-center p-2 "
                // eslint-disable-next-line react/no-array-index-key
                key={i}
              >
                <Skeleton
                  circle
                  className="mr-1 mt-0"
                  width={54}
                  height={54}
                />
                <div className="w-100">
                  <Skeleton width="100%" height={40} />
                </div>
              </div>
            ))
          : featuredSubjects?.map((subject) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              className="subject-wrapper d-flex flex-column"
              key={subject.slug}
              onClick={() => {
                dispatch(resetSearchFilters());
                dispatch(setSearchSubject([subject.title]));
                history.push('/search');
              }}
            >
              <div className="subject-img-wrapper">
                <img src={subject.image ?? logoPlaceholder} alt="subject" />
              </div>
              <span className="font-sm">{subject.title}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedSubjects;
