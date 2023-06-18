/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Form,
  FullscreenModal,
  Icon,
  Menu,
  MenuItem,
  useCheckboxSetValues,
  useToggle,
} from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useEffect } from 'react';
import useGetActiveLangs from '../../../../../hooks/useGetActiveLangs';
import { codeToTitle, getLangCode } from '../../../../../utils/supportsLanguages';
import { setSearchLanguageCodes } from '../../../../../redux/slice/searchQuerySlice';

const MobileLanguageFilter = () => {
  const [isOpen, open, close] = useToggle(false);
  const language = useSelector((state) => state.searchFilters.language_codes);
  const dispatch = useDispatch();

  const { activeLangs } = useGetActiveLangs();

  const [languageValues, {
    add, remove, clear, set,
  }] = useCheckboxSetValues(
    [],
  );
  const handleChange = (e) => {
    if (e.target.checked) {
      add(getLangCode(e.target.value));
    } else {
      remove(getLangCode(e.target.value));
    }
  };
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
              id="search.facets.language"
              defaultMessage="Language"
            />
          </h4>
          <Button
            variant="tertiary"
            size="sm"
            className="reset-btn"
            onClick={() => {}}
          >
            <FormattedMessage id="reset.text" defaultMessage="Reset" />
          </Button>
        </div>
        <div className="facet-menu mobile-facet-menu h-100 d-flex flex-column">
          <div className="d-flex flex-column justify-content-between h-100">
            <Form.Group>
              <Form.CheckboxSet
                name="color-two"
                onChange={(e) => handleChange(e)}
                value={codeToTitle(languageValues)}
              >
                <Menu>
                  {activeLangs?.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center item-wrapper"
                      key={item.code}
                    >
                      <MenuItem as={Form.Checkbox} value={item.name} className="pl-2">
                        {item.name}
                      </MenuItem>
                      {/* <span className="pr-4">{item.count}</span> */}
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
                  dispatch(setSearchLanguageCodes(languageValues));
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
            id="search.facets.language"
            defaultMessage="Language"
          />
          {language.length > 0 && (
            <span className="font-weight-bold ml-1 text-brand-500">{`(${language.length})`}</span>
          )}
        </p>
        <Icon src={ArrowForwardIos} />
      </div>
    </>
  );
};

export default MobileLanguageFilter;
