/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon, ModalLayer } from '@edx/paragon';
import { Check, Close } from '@edx/paragon/icons';

const ViewByModal = ({ isOpen, close }) => (
  <ModalLayer isOpen={isOpen} onClose={close}>
    <div
      role="dialog"
      aria-label="My dialog"
      className="  bg-white more-modal-items "
    >
      <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
        <span className="font-sm">
          <FormattedMessage
            id="filter.viewOptions.text"
            defaultMessage="view options"
          />
        </span>
        <Icon src={Close} className=" share-icon" onClick={close} />
      </div>
      <ul className="px-4 font-xl transform-rtl">
        <li className="d-flex justify-content-between my-2.5">
          <FormattedMessage id="filter.All.text" defaultMessage="All" />
          {/* <Icon className="check-icon" src={Check} /> */}
        </li>
        <li className="d-flex justify-content-between mb-2.5">
          <FormattedMessage
            id="filter.courses.text"
            defaultMessage="Courses"
          />
          <Icon className="check-icon" src={Check} />
        </li>
        <li className="d-flex justify-content-between">
          <FormattedMessage
            id="filter.programs.text"
            defaultMessage="Programs"
          />
          {/* <Icon className="check-icon" src={Check} /> */}
        </li>
      </ul>
    </div>
  </ModalLayer>
);

export default ViewByModal;
