/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import React from 'react';
import UnenrollAlertButtons from './UnenrollAlertButtons';
import messages from '../../../../../../messages';

const BottomSheetUnenrollAlert = ({
  handleUnenroll,
  onClose,
  visibleCourseId,
  courseId,
  intl,
}) => (
  <ModalLayer isOpen={visibleCourseId === courseId} onClose={onClose}>
    <div className="d-flex flex-column align-items-center bg-white more-modal-items px-3 py-4 bottom-sheet-alert">
      <div className="d-flex pb-3 unenroll-icon-wrapper align-items-center">
        <Icon className="mr-2" src={Info} />
        <h3>{intl.formatMessage(messages['unenroll.alert.title'])}</h3>
      </div>
      <p className="pb-4">
        <FormattedMessage
          id="courseInfo.unenrollMessage.text"
          defaultMessage="When you unenroll, your courses will be removed from your dashboard"
        />
      </p>
      <UnenrollAlertButtons handleUnenroll={handleUnenroll} />
    </div>
  </ModalLayer>
);

export default injectIntl(BottomSheetUnenrollAlert);
