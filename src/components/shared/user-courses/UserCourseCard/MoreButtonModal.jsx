/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import {
  Close, Delete, Share, VideoTranscript,
} from '@edx/paragon/icons';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../../../redux/slice/toastSlice';
import { ReactComponent as Learning } from '../../../../assets/learning-icon.svg';
import useGetCertificate from '../../../../hooks/useGetCertificate';
import SharedToastMessage from '../../base-components/SharedToastMessage';
import messages from '../../../../messages';

const MoreButtonModal = ({
  isOpen, onClose, courseInfo, intl,
}) => {
  const queryClient = useQueryClient();
  const deleteEnrollCourse = useMutation({
    mutationFn: (courseId) => getAuthenticatedHttpClient().post(
      `${getConfig().LMS_BASE_URL}/admin-console/api/openedx/api/unenroll/`,
      {
        course_id: courseId,
      },
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['OverviewList']);
      queryClient.invalidateQueries(['EnrollmentList']);
      queryClient.invalidateQueries(['enrollmentStatus']);
    },
  });
  const dispatch = useDispatch();
  const { certificateData } = useGetCertificate(courseInfo);

  return (
    <ModalLayer isOpen={isOpen} onClose={onClose}>
      <div
        role="dialog"
        aria-label="My dialog"
        className="  bg-white more-modal-items "
      >
        <div className="d-flex close-wrapper justify-content-end py-2 px-4">
          <Icon src={Close} className=" share-icon" onClick={onClose} />
        </div>
        <div className="d-flex flex-column mx-4 color-black">
          {certificateData && (
            <a
              className="d-flex align-items-center py-2 color-black"
              href={`${getConfig().LEARNING_BASE_URL}/course/${
                courseInfo?.course_details?.course_id
              }/home`}
            >
              <Icon src={Learning} className="mr-2 text-gray-500" />
              <span>
                <FormattedMessage
                  id="userCourseCard.goToYourCourse.button"
                  defaultMessage="Go To Your Course"
                />
              </span>
            </a>
          )}
          <Link
            className="d-flex align-items-center py-2 color-black"
            to={`/course/${courseInfo?.course_metadata?.slug}`}
          >
            <Icon src={VideoTranscript} className="mr-2 text-gray-500" />
            <FormattedMessage
              id="userCourseCard.courseInfo.button"
              defaultMessage="Course Info"
            />
          </Link>
          <div
            className="d-flex align-items-center py-2 "
            onClick={() => {
              navigator.clipboard.writeText(
                `${getConfig().BASE_URL}/homepage/course/${
                  courseInfo?.course_metadata?.slug
                }`,
              );
              dispatch(setToastMessage(<SharedToastMessage />));
              onClose();
            }}
          >
            <Icon
              src={Share}
              className="mr-2 text-gray-500"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${getConfig().BASE_URL}/homepage/course/${
                    courseInfo?.course_metadata?.slug
                  }`,
                );
                dispatch(setToastMessage(<SharedToastMessage />));
                onClose();
              }}
            />
            <FormattedMessage
              id="dashboard.share.item"
              defaultMessage="Share"
            />
          </div>
          <div
            className="d-flex align-items-center py-2 "
            onClick={(e) => {
              e.preventDefault();
              deleteEnrollCourse.mutate(courseInfo?.course_details?.course_id);
              dispatch(
                setToastMessage(
                  intl.formatMessage(
                    messages['userCourseCard.unrollMessage.text'],
                  ),
                ),
              );
            }}
          >
            <Icon src={Delete} className="mr-2 text-gray-500" />
            <FormattedMessage
              id="dashboard.unroll.item"
              defaultMessage="Unenroll"
            />
          </div>
        </div>
      </div>
    </ModalLayer>
  );
};

export default injectIntl(MoreButtonModal);
