/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Form,
  FullscreenModal,
  Icon,
  Menu,
  MenuItem,
  SearchField,
  useCheckboxSetValues,
  useToggle,
} from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useEffect } from 'react';
import {
  setSearchSubject,
} from '../../../../../redux/slice/searchQuerySlice';
import { SUBJECTS_FILTER_ITEMS } from '../../../../../utils/constants';

const MobileSubjectFilter = () => {
  const [isOpen, open, close] = useToggle(false);
  const subject = useSelector((state) => state.searchFilters.subject);
  const dispatch = useDispatch();
  const [subjectValues, {
    add, remove, clear, set,
  }] = useCheckboxSetValues([]);
  const handleChange = (e) => {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };
  useEffect(() => {
    clear();
    if (subject.length > 0) {
      set(subject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, isOpen]);

  return (
    <>
      <FullscreenModal
        className="filter-modal"
        isOpen={isOpen}
        onClose={() => close()}
      >
        <div className="d-flex align-items-center justify-content-between p-3 modal-header-wrapper">
          <Icon
            src={ArrowBack}
            loadPages
            onClick={() => {
              close();
            }}
            className="mx-2 "
          />
          <h4>Subject</h4>
          <Button
            variant="tertiary"
            size="sm"
            className="reset-btn"
            onClick={() => {}}
          >
            Reset
          </Button>
        </div>
        <div className="facet-menu mobile-facet-menu h-100 d-flex flex-column">
          <SearchField
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder="Find a ..."
          />
          <div className="d-flex flex-column justify-content-between h-100">
            <Form.Group>
              <Form.CheckboxSet
                name="color-two"
                onChange={(e) => handleChange(e)}
                value={subjectValues}
              >
                <Menu>
                  {SUBJECTS_FILTER_ITEMS.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center item-wrapper"
                      key={item.id}
                    >
                      <MenuItem as={Form.Checkbox} value={item.title}>
                        {item.title}
                      </MenuItem>
                      <span className="pr-4">{item.count}</span>
                    </div>
                  ))}
                </Menu>
              </Form.CheckboxSet>
            </Form.Group>
            <div className="p-4">
              <Button
                variant="brand"
                className="w-100"
                onClick={() => {
                  // dispatch(resetSearchFilters());
                  dispatch(setSearchSubject(subjectValues));
                  close();
                }}
              >
                <FormattedMessage
                  id="search.Apply.button"
                  defaultMessage="Apply"
                />
              </Button>
            </div>
          </div>
        </div>
      </FullscreenModal>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => open()}
      >
        <p className="font-sm d-flex justify-content-center align-items-center">
          <FormattedMessage
            id="search.facets.subject"
            defaultMessage="Subject"
          />
          {subject.length > 0 && (
            <span className="font-weight-bold ml-1 text-brand-500">{`(${subject.length})`}</span>
          )}
        </p>
        <Icon src={ArrowForwardIos} />
      </div>
    </>
  );
};

export default MobileSubjectFilter;
