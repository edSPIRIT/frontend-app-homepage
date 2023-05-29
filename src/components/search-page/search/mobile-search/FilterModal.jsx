import { Button, FullscreenModal, Icon } from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import MobileFilterChips from './filter-modal/MobileFilterChips';
import MobileSubjectFilter from './filter-modal/MobileSubjectFilter';
import { resetSearchFilters } from '../../../../redux/slice/searchQuerySlice';
import MobilePartnerFilter from './filter-modal/MobilePartnerFilter';
import MobileInstructorFilter from './filter-modal/MobileInstructorFilter';
import MobileLanguageFilter from './filter-modal/MobileLanguageFilter';
import MobileAvailabilityFilter from './filter-modal/MobileAvailabilityFilter';
import MobileLearningTypeFilter from './filter-modal/MobileLearningTypeFilter';

const FilterModal = ({ isOpenFilter, closeFilter }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.searchFilters);

  return (
    <FullscreenModal
      className="filter-modal"
      isOpen={isOpenFilter}
      onClose={() => closeFilter()}
    >
      <div className="d-flex align-items-center justify-content-between p-3 modal-header-wrapper">
        <Icon
          src={ArrowBack}
          loadPages
          onClick={() => {
            closeFilter();
          }}
          className="mx-2 "
        />
        <h4>
          <FormattedMessage id="filters.text" defaultMessage="Filters" />
        </h4>
        <Button
          variant="tertiary"
          size="sm"
          className="reset-btn"
          onClick={() => dispatch(resetSearchFilters())}
        >
          <FormattedMessage id="reset.text" defaultMessage="Reset" />
        </Button>
      </div>
      {(filters.instructors.length > 0
        || filters.partner.length > 0
        || filters.subject.length > 0
        || filters.language_code.length > 0) && <MobileFilterChips />}
      <div className="d-flex flex-column px-4 py-2.5 mobile-facets-wrapper ">
        <MobileSubjectFilter />
        <MobilePartnerFilter />
        <MobileInstructorFilter />
        <MobileLanguageFilter />
        <MobileAvailabilityFilter />
        <MobileLearningTypeFilter />

      </div>
    </FullscreenModal>
  );
};
FilterModal.propTypes = {
  isOpenFilter: PropTypes.bool.isRequired,
  closeFilter: PropTypes.func.isRequired,
};
export default FilterModal;
