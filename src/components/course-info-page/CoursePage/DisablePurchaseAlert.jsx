/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, AlertModal, Button } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import messages from '../../../messages';
import { setActivatePurchaseAlert } from '../../../redux/slice/activatePurchaseAlertSlice';

const DisablePurchaseAlert = ({ activateState, intl }) => {
  const dispatch = useDispatch();

  return (
    <AlertModal
      className="course-info-alert"
      title={intl.formatMessage(messages['inActivePurchase.alert.title'])}
      isOpen={activateState}
      onClose={() => dispatch(setActivatePurchaseAlert(false))}
      variant="danger"
      icon={Info}
      footerNode={(
        <ActionRow>
          <Button
            variant="tertiary"
            onClick={() => dispatch(setActivatePurchaseAlert(false))}
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
          id="courseInfo.inActivePurchase.text"
          defaultMessage="We apologize, but our payment gateway services are currently unavailable due to an update. For assistance with services and purchases, please contact our support department. Thank you!"
        />
      </p>
    </AlertModal>
  );
};

export default injectIntl(DisablePurchaseAlert);
