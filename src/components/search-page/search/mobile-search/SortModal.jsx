/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import { Check, Close } from '@edx/paragon/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messages from '../../../../messages';
import { setCourseSortValue } from '../../../../redux/slice/allCoursesSlice';

const SortModal = ({ intl, isOpen, close }) => {
  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sortAllCourses.value);
  const handleItemClick = (sortType) => {
    dispatch(setCourseSortValue(sortType));
  };

  return (
    <ModalLayer isOpen={isOpen} onClose={close}>
      <div aria-label="My dialog" className="  bg-white more-modal-items ">
        <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
          <span className="font-sm" />
          <Icon src={Close} className=" share-icon" onClick={close} />
        </div>
        <ul className="px-4 font-xl transform-rtl">
          <li
            onClick={() => {
              handleItemClick('recent');
              close();
            }}
            className="d-flex justify-content-between my-2.5"
          >
            <FormattedMessage id="recent" defaultMessage="Recent" />
            {intl.formatMessage(messages[sortState])
              === intl.formatMessage(messages.recent) && (
              <Icon className="check-icon" src={Check} />
            )}
          </li>
          <li
            onClick={() => {
              handleItemClick('ascending');
              close();
            }}
            className="d-flex justify-content-between mb-2.5"
          >
            <FormattedMessage id="ascending" defaultMessage="Title A to Z" />
            {intl.formatMessage(messages[sortState])
              === intl.formatMessage(messages.ascending) && (
              <Icon className="check-icon" src={Check} />
            )}
          </li>
          <li
            onClick={() => {
              handleItemClick('descending');
              close();
            }}
            className="d-flex justify-content-between"
          >
            <FormattedMessage id="descending" defaultMessage="Title Z to A" />
            {intl.formatMessage(messages[sortState])
              === intl.formatMessage(messages.descending) && (
              <Icon className="check-icon" src={Check} />
            )}
          </li>
        </ul>
      </div>
    </ModalLayer>
  );
};
SortModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SortModal);
