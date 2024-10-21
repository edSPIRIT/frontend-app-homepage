/* eslint-disable no-undef */
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
  Skeleton,
  useCheckboxSetValues,
  useToggle,
} from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, FormattedNumber, injectIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { setSearchSubject } from '../../../../../redux/slice/searchQuerySlice';
import useSubjectsFacetInfinite from '../../../../../hooks/useSubjectsFacetInfinite';
import messages from '../../../../../messages';

const MobileSubjectFilter = () => {
  const { ref, inView } = useInView();
  const [isOpen, open, close] = useToggle(false);
  const subjects = useSelector((state) => state.searchFilters.subjects);
  const dispatch = useDispatch();
  const [subjectValues, {
    add, remove, clear, set,
  }] = useCheckboxSetValues([]);

  const [searchString, setSearchString] = useState('');
  const { subjectsFilterItems, loading, isFetching } = useSubjectsFacetInfinite(
    searchString,
    inView,
  );

  const handleChange = (e) => {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };

  useEffect(() => {
    clear();
    if (subjects.length > 0) {
      set(subjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, isOpen]);

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
          <h4>
            <FormattedMessage
              id="search.facets.subject"
              defaultMessage="Subject"
            />
          </h4>
          <Button
            variant="tertiary"
            size="sm"
            className="reset-btn"
            onClick={() => clear()}
          >
            <FormattedMessage id="reset.text" defaultMessage="Reset" />
          </Button>
        </div>
        <div className="facet-menu mobile-facet-menu h-100 d-flex flex-column">
          <SearchField
            onChange={(value) => setSearchString(value)}
            onSubmit={(value) => setSearchString(value)}
            placeholder={intl.formatMessage(messages['partners.search.find'])}
            inputProps={{
              autoComplete: 'off',
            }}
          />
          <div className="d-flex flex-column justify-content-between h-100">
            <Form.Group>
              <Form.CheckboxSet
                name="color-two"
                onChange={(e) => handleChange(e)}
                value={subjectValues}
              >
                <Menu>
                  {subjectsFilterItems?.length === 0 && searchString && (
                    <span className="text-gray-500 no-result">
                      <FormattedMessage
                        id="search.noResult.text"
                        defaultMessage="We couldn't find any exact matches"
                      />
                    </span>
                  )}
                  {subjectsFilterItems?.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center item-wrapper"
                      key={item.id}
                    >
                      <MenuItem
                        as={Form.Checkbox}
                        value={item.title}
                        className="pl-2"
                      >
                        {item.title}
                      </MenuItem>
                      <span className="pr-4">
                        <FormattedNumber value={item.courses_count} />
                      </span>
                    </div>
                  ))}
                  <div ref={ref} />
                  {(loading || isFetching) && (
                    <div className="d-flex pl-3 justify-content-between">
                      <div className="d-flex ">
                        <Skeleton className="mr-2" width={18} height={18} />
                        <Skeleton className="" width={90} height={18} />
                      </div>
                      <Skeleton className="mr-2" width={15} height={18} />
                    </div>
                  )}
                </Menu>
              </Form.CheckboxSet>
            </Form.Group>
            <div className="p-4 sticky-bottom">
              <Button
                variant="brand"
                className="w-100"
                onClick={() => {
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
        <p className="font-sm d-flex justify-content-center align-items-center py-2">
          <FormattedMessage
            id="search.facets.subject"
            defaultMessage="Subject"
          />
          {subjects.length > 0 && (
            <span className="font-weight-bold ml-1 text-brand-500">{`(${subjects.length})`}</span>
          )}
        </p>
        <Icon src={ArrowForwardIos} />
      </div>
    </>
  );
};

export default injectIntl(MobileSubjectFilter);
