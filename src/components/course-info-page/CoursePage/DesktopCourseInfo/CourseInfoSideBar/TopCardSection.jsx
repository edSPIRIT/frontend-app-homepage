/* eslint-disable react/prop-types */
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import React from 'react';

const TopCardSection = ({ courseMetaData }) => {
  const coursePrice = courseMetaData?.paid_course?.price || 0;
  const courseCurrency = courseMetaData?.paid_course?.currency || 'USD';
  const hasTrial = courseMetaData?.paid_course?.has_trial;
  const priceStatus = () => {
    if (coursePrice > 0 && hasTrial) {
      return (
        <FormattedMessage
          id="courseCard.freeTrial.text"
          defaultMessage="Free Trial"
        />
      );
    }
    if (coursePrice > 0 && !hasTrial) {
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
  return (
    <div className="mt-4.5 px-4">
      <h2 className="mb-1">{priceStatus()}</h2>
      {hasTrial ? (
        <p className="d-flex flex-wrap font-sm">
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.until.text"
              defaultMessage="Until"
            />
          </span>
          <span>
            <FormattedDate
              value={courseMetaData?.paid_course?.trial_end}
              day="numeric"
              month="short"
              year="numeric"
            />
          </span>
          {courseMetaData?.paid_course?.show_price_on_trial ? (
            <>
              <span className="ml-1">
                <FormattedMessage
                  id="courseInfo.then.text"
                  defaultMessage="then"
                />
              </span>
              <span className="price-symbol-wrapper ml-1">
                <span className="mr-1">
                  <FormattedMessage id={courseCurrency} defaultMessage="$" />
                </span>
                <span className="mr-1">
                  <FormattedNumber
                    value={
                      courseCurrency === 'USD' ? coursePrice / 100 : coursePrice
                    }
                    minimumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
                    maximumFractionDigits={courseCurrency === 'USD' ? 2 : 0}
                  />
                </span>
              </span>
            </>
          ) : null}
        </p>
      ) : (
        <span className="text-gray-500 font-sm">
          <FormattedMessage
            id="courseInfo.lifetimeAccess.text"
            defaultMessage="Lifetime access"
          />
        </span>
      )}
    </div>
  );
};

export default TopCardSection;
