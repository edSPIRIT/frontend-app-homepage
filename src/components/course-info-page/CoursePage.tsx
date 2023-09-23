/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow, AlertModal, Button, useMediaQuery,
} from '@edx/paragon';
import { Warning } from '@edx/paragon/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';
import messages from '../../messages';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import DesktopCourseInfo from './CoursePage/DesktopCourseInfo';

const MobileCourseInfo = React.lazy(() => import('./CoursePage/MobileCourseInfo'));

const CoursePage = ({ intl }) => {
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const [isOpen, setOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment');

  useEffect(() => {
    if (paymentStatus === 'fail') {
      setOpen(true);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (courseMetaData) {
      document.title = `${courseMetaData?.additional_metadata?.display_name} | ${getConfig().SITE_NAME}`;
    }
  }, [courseMetaData]);
  return (
    <>
      {isMobile ? <MobileCourseInfo /> : <DesktopCourseInfo />}
      <SimilarCourses
        courseTitles={courseMetaData?.additional_metadata?.display_name}
        courseIds={[`${courseMetaData?.course_id}`]}
        loading={loading}
      />
      <AlertModal
        className="failed-alert"
        title={intl.formatMessage(
          messages['transaction.failed'],
        )}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        variant="danger"
        icon={Warning}
        footerNode={(
          <ActionRow>
            <Button variant="tertiary" onClick={() => setOpen(false)}>
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
            id="courseInfo.unsuccessfulPaymentMessage.text"
            defaultMessage="The payment was unsuccessful"
          />
        </p>
      </AlertModal>
    </>
  );
};

export default injectIntl(CoursePage);
