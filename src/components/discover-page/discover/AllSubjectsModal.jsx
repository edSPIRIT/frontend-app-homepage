/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  FullscreenModal, Icon, SearchField, Skeleton,
} from '@edx/paragon';
import { Close } from '@edx/paragon/icons';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import messages from '../../../messages';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';
import useGetSubjectsFacet from '../../../hooks/useGetSubjectsFacet';

const AllSubjectsModal = ({ isOpen, close, intl }) => {
  const [searchString, setSearchString] = useState('');
  const { subjects, loading } = useGetSubjectsFacet(searchString);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <FullscreenModal
      className="filter-modal subjects-modal"
      isOpen={isOpen}
      onClose={close}
    >
      <div className="d-flex align-items-center justify-content-between p-2 modal-header-wrapper ">
        <span className="font-sm">
          <FormattedMessage
            id="allSubjects.text"
            defaultMessage="All subjects"
          />
        </span>
        <Icon
          src={Close}
          loadPages
          onClick={() => {
            close();
          }}
          style={{ width: '20px', height: '20px' }}
          className="mx-2 "
        />
      </div>
      <SearchField
        onChange={(value) => {
          setSearchString(value);
        }}
        placeholder={intl.formatMessage(
          messages['subjectModal.search.placeholder'],
        )}
      />
      <div className="d-flex flex-column">
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
          : subjects?.map((subject) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              className="mobile-subject-wrapper d-flex"
              key={subject.slug}
              onClick={() => {
                dispatch(resetSearchFilters());
                dispatch(setSearchSubject([subject.title]));
                history.push('/search');
              }}
            >
              <img
                className="subject-img mr-3"
                src={subject.image}
                alt="subject"
              />
              <p className="subject-title">{subject.title}</p>
            </div>
          ))}
      </div>
    </FullscreenModal>
  );
};
AllSubjectsModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AllSubjectsModal);
