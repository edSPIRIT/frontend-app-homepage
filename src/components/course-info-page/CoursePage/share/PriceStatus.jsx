/* eslint-disable react/prop-types */
import { FormattedMessage, FormattedNumber } from '@edx/frontend-platform/i18n';
import React from 'react';

const PriceStatus = ({ courseMetaData }) => {
  const coursePrice = courseMetaData?.paid_course?.price || 0;
  const courseCurrency = courseMetaData?.paid_course?.currency || 'USD';
  const hasTrial = courseMetaData?.paid_course?.has_trial;
  if (courseMetaData?.paid_course?.active && hasTrial) {
    return (
      <FormattedMessage
        id="courseCard.freeTrial.text"
        defaultMessage="Free Trial"
      />
    );
  }
  if (courseMetaData?.paid_course?.active && !hasTrial) {
    return (
      <p className="price-symbol-wrapper">
        <span className="mr-1">
          <FormattedMessage id={courseCurrency} defaultMessage="$" />
        </span>
        <span className="mr-1">
          <FormattedNumber
            value={courseCurrency === 'USD' ? coursePrice / 100 : coursePrice}
            minimumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
            maximumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
          />
        </span>
      </p>
    );
  }
  return <FormattedMessage id="courseCard.free.text" defaultMessage="Free" />;
};

export default PriceStatus;
