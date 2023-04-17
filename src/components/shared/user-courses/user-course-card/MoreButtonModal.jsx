import { getConfig } from '@edx/frontend-platform';
import { Icon, ModalLayer } from '@edx/paragon';
import { Close, Delete, Share } from '@edx/paragon/icons';
import PropTypes from 'prop-types';

const MoreButtonModal = ({ isOpen, onClose, courseInfo }) => (
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
        <div className="d-flex align-items-center py-2 ">
          <Icon
            src={Share}
            className="mr-2"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://apps.${getConfig().LMS_BASE_URL.replace(
                  'https://',
                  '',
                )}homepage/course/${courseInfo?.course_metadata?.slug}`,
              );
            }}
          />
          <span>Share</span>
        </div>
        <div className="d-flex align-items-center py-2 ">
          <Icon
            src={Delete}
            className="mr-2"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://apps.${getConfig().LMS_BASE_URL.replace(
                  'https://',
                  '',
                )}homepage/course/${courseInfo?.course_metadata?.slug}`,
              );
            }}
          />
          <span>Unroll</span>
        </div>
      </div>
    </div>
  </ModalLayer>
);
MoreButtonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  courseInfo: PropTypes.any,
};

export default MoreButtonModal;
