/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { AlertModal } from '@edx/paragon';
import React from 'react';
import { Info } from '@edx/paragon/icons';
import UnenrollAlertButtons from './UnenrollAlertButtons';
import messages from '../../../../../../messages';

const DesktopUnenrollAlert = ({
  handleUnenroll,
  onClose,
  visibleCourseId,
  courseId,
  intl,
}) => (
  <AlertModal
    className="course-info-alert"
    title={intl.formatMessage(messages['unenroll.alert.title'])}
    isOpen={visibleCourseId === courseId}
    onClose={onClose}
    variant="danger"
    icon={Info}
    footerNode={<UnenrollAlertButtons handleUnenroll={handleUnenroll} />}
  >
    <p>
      <FormattedMessage
        id="courseInfo.unenrollMessage.text"
        defaultMessage="When you unenroll, your courses will be removed from your dashboard"
      />
    </p>
  </AlertModal>
);
export default injectIntl(DesktopUnenrollAlert);
