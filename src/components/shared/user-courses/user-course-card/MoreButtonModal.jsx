/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import {
  Close, Delete, Share, VideoTranscript,
} from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

const MoreButtonModal = ({ isOpen, onClose, courseInfo }) => {
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
      // setShowToast(true);
    },
  });
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
          <Link
            className="d-flex align-items-center py-2 color-black"
            to={`/course/${courseInfo?.course_metadata?.slug}`}
          >
            <Icon src={VideoTranscript} className="mr-2 text-gray-500" />
            <FormattedMessage
              id="dashboard.courseInfo.item"
              defaultMessage="Course info"
            />
          </Link>
          <div
            className="d-flex align-items-center py-2 "
            onClick={() => {
              navigator.clipboard.writeText(
                `${getConfig().BASE_URL}homepage/course/${
                  courseInfo?.course_metadata?.slug
                }`,
              );
            }}
          >
            <Icon src={Share} className="mr-2 text-gray-500" />
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
            }}
          >
            <Icon src={Delete} className="mr-2 text-gray-500" />
            <FormattedMessage
              id="dashboard.unroll.item"
              defaultMessage="Unroll"
            />
          </div>
        </div>
      </div>
    </ModalLayer>
  );
};
MoreButtonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  courseInfo: PropTypes.any,
};

export default MoreButtonModal;
