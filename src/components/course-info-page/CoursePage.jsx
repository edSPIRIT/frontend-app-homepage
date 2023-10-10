/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, AlertModal, Button, useMediaQuery } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';
import messages from '../../messages';
import { setActivateAlert } from '../../redux/slice/activateAlertSlice';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import DesktopCourseInfo from './CoursePage/DesktopCourseInfo';
import useEnrollClickHandler from '../../hooks/useEnrollClickHandler';

const MobileCourseInfo = React.lazy(() =>
  import('./CoursePage/MobileCourseInfo')
);

const CoursePage = ({ intl }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const activateState = useSelector((state) => state.activateAlert.open);

  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const [isOpen, setOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment_status');

  const {
    enrollClickHandler,
    isLoading: enrollLoading,
    availablePaymentData,
  } = useEnrollClickHandler(courseMetaData);

  useEffect(() => {
    if (paymentStatus === 'failed') {
      setOpen(true);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (courseMetaData) {
      document.title = `${
        courseMetaData?.additional_metadata?.display_name
      } | ${getConfig().SITE_NAME}`;
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
        className='failed-alert'
        title={intl.formatMessage(messages['inActive.alert.title'])}
        isOpen={activateState}
        onClose={() => dispatch(setActivateAlert(false))}
        variant='danger'
        icon={Info}
        footerNode={
          <ActionRow>
            <Button
              variant='tertiary'
              onClick={() => dispatch(setActivateAlert(false))}
            >
              <FormattedMessage
                id='courseInfo.dismiss.button'
                defaultMessage='Dismiss'
              />
            </Button>
          </ActionRow>
        }
      >
        <p>
          <FormattedMessage
            id='courseInfo.inActiveUser.text'
            defaultMessage='Please activate your account via email to proceed.'
          />
        </p>
      </AlertModal>
      <AlertModal
        className='failed-alert'
        title={intl.formatMessage(messages['transaction.failed'])}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        variant='danger'
        icon={Info}
        footerNode={
          <ActionRow>
            <ActionRow>
              <Button
                variant='tertiary'
                onClick={() => {
                  history.push(`/course/${slug}`);
                  setOpen(false);
                }}
              >
                <FormattedMessage
                  id='courseInfo.dismiss.button'
                  defaultMessage='Dismiss'
                />
              </Button>
              <Button variant='danger' onClick={enrollClickHandler}>
                <FormattedMessage
                  id='courseInfo.RetryPayment.button'
                  defaultMessage='Retry Payment'
                />
              </Button>
            </ActionRow>
          </ActionRow>
        }
      >
        <p>
          <FormattedMessage
            id='courseInfo.unsuccessfulPaymentMessage.text'
            defaultMessage='Please check your payment details and try again. If the issue persists, feel free to contact our support team for assistance.'
          />
        </p>
      </AlertModal>
    </>
  );
};

export default injectIntl(CoursePage);
