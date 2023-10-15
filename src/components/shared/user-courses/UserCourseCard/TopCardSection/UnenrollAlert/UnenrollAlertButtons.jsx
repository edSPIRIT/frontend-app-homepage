/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ActionRow, Button } from '@edx/paragon';
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideUnenrollAlert } from '../../../../../../redux/slice/course/unenrollAlert';

const UnenrollAlertButtons = ({
  handleUnenroll,
}) => {
  const dispatch = useDispatch();

  return (
    <ActionRow>
      <ActionRow>
        <Button
          variant="tertiary"
          onClick={() => dispatch(hideUnenrollAlert())}
        >
          <FormattedMessage id="cancel.button" defaultMessage="Cancel" />
        </Button>
        <Button variant="danger" onClick={(e) => handleUnenroll(e)}>
          <FormattedMessage
            id="userCourseCard.unroll.text"
            defaultMessage="Unenroll"
          />
        </Button>
      </ActionRow>
    </ActionRow>
  );
};

export default UnenrollAlertButtons;
