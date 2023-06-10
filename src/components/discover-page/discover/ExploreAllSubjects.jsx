/* eslint-disable react/prop-types */
import React from 'react';
import { Skeleton } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import useGetSubjects from '../../../hooks/useGetSubjects';
import logoPlaceholder from '../../../assets/place-holders/org-logo-place-holder.svg';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';

const ExploreAllSubjects = () => {
  const history = useHistory();
  const { arrangedSubjects, loading } = useGetSubjects();
  const dispatch = useDispatch();

  return (
    <div className="custom-container pt-5 explore-container">
      <div className="d-flex justify-content-between">
        <h2>
          <FormattedMessage
            id="discover.exploreAllSubjects.text"
            defaultMessage="Explore all subjects"
          />
        </h2>
      </div>
      <div className="subjects-container pt-4">
        {loading
          ? Array(10)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="subject-wrapper" key={i}>
                <Skeleton className="mr-1" width={66} height={66} />
                <Skeleton width={175} height={20} />
              </div>
            ))
          : arrangedSubjects?.map((subject) => (
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

export default ExploreAllSubjects;
