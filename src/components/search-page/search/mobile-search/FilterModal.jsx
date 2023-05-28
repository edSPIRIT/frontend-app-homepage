import { Button, FullscreenModal, Icon } from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MobileFilterChips from './filter-modal/MobileFilterChips';
import MobileSubjectFilter from './filter-modal/MobileSubjectFilter';
import { resetSearchFilters } from '../../../../redux/slice/searchQuerySlice';

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
        <h4>Filters</h4>
        <Button
          variant="tertiary"
          size="sm"
          className="reset-btn"
          onClick={() => dispatch(resetSearchFilters())}
        >
          Reset
        </Button>
      </div>
      { (filters.instructors.length > 0
          || filters.partner.length > 0
          || filters.subject.length > 0
          || filters.language_code.length > 0) && <MobileFilterChips />}
      <div className="d-flex flex-column px-4 py-2.5 mobile-facets-wrapper">
        <MobileSubjectFilter />
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="py-2">Partner</h5>
          <Icon className="" src={ArrowForwardIos} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="py-2">Instructor</h5>
          <Icon className="" src={ArrowForwardIos} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="py-2">Instructors</h5>
          <Icon className="" src={ArrowForwardIos} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="py-2">Language</h5>
          <Icon className="" src={ArrowForwardIos} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="py-2">Availability</h5>
          <Icon className="" src={ArrowForwardIos} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="py-2">Learning type</h5>
          <Icon className="" src={ArrowForwardIos} />
        </div>
      </div>
    </FullscreenModal>
  );
};
FilterModal.propTypes = {
  isOpenFilter: PropTypes.bool.isRequired,
  closeFilter: PropTypes.func.isRequired,
};
export default FilterModal;
