/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, AlertModal, Button } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import messages from '../../../messages';
import { setActivateAlert } from '../../../redux/slice/activateAlertSlice';

const InactiveEmailAlert = ({ activateState, intl }) => {
  const dispatch = useDispatch();

  return (
    <AlertModal
      className="course-info-alert"
      title={intl.formatMessage(messages['inActive.alert.title'])}
      isOpen={activateState}
      onClose={() => dispatch(setActivateAlert(false))}
      variant="danger"
      icon={Info}
      footerNode={(
        <ActionRow>
          <Button
            variant="tertiary"
            onClick={() => dispatch(setActivateAlert(false))}
          >
            <FormattedMessage
              id="courseInfo.dismiss.button"
              defaultMessage="Dismiss"
            />
          </Button>
        </ActionRow>
      )}
    >
      <p>
        <FormattedMessage
          id="courseInfo.inActiveUser.text"
          defaultMessage="Please activate your account via email to proceed."
        />
      </p>
    </AlertModal>
  );
};

export default injectIntl(InactiveEmailAlert);
