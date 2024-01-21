/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Form,
  FullscreenModal,
  Icon,
  useCheckboxSetValues,
  useToggle,
} from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import { useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useEffect } from 'react';

const MobileLearningTypeFilter = () => {
  const [isOpen, open, close] = useToggle(false);
  const language = useSelector((state) => state.searchFilters.language_codes);
  //   const dispatch = useDispatch();
  const [{ clear, set }] = useCheckboxSetValues(
    [],
  );
  useEffect(() => {
    clear();
    if (language.length > 0) {
      set(language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, isOpen]);

  return (
    <>
      <FullscreenModal
        className="filter-modal"
        isOpen={isOpen}
        onClose={() => close()}
      >
        <div className="d-flex align-items-center justify-content-between p-3 modal-header-wrapper zindex-1">
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
              id="search.facets.learningType"
              defaultMessage="LearningType"
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
          <div className="d-flex flex-column justify-content-between h-100">
            <Form.Group className="pt-2.5 px-3 learning-type-wrapper">
              <Form.RadioSet
                name="color-two"
                // onChange={handleChange}
                // value={value}
              >
                <Form.Radio value="Courses" className="py-2">

                  <FormattedMessage
                    id="courses.text"
                    defaultMessage="Courses"
                  />
                  <span className="count">635</span>
                </Form.Radio>
                <Form.Radio value="Programs" className="py-2">
                  <FormattedMessage
                    id="programs.text"
                    defaultMessage="Programs"
                  />
                  <span className="count">100</span>
                </Form.Radio>
              </Form.RadioSet>
            </Form.Group>
            <div className="p-4">
              <Button
                variant="brand"
                className="w-100"
                onClick={() => {
                  // dispatch(resetSearchFilters());
                //   dispatch(setSearchLanguageCodes(languageValues));
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
            id="search.facets.learningType"
            defaultMessage="LearningType"
          />
          {/* {language.length > 0 && (
            <span className="font-weight-bold ml-1 text-brand-500">{`(${language.length})`}</span>
          )} */}
        </p>
        <Icon src={ArrowForwardIos} />
      </div>
    </>
  );
};

export default MobileLearningTypeFilter;
