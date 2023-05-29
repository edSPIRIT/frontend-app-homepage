import {
  Dropdown, Form, Menu, MenuItem,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { LANGUAGE_FILTER_ITEMS } from '../../../../../utils/constants';
import { setSearchLanguageCode } from '../../../../../redux/slice/searchQuerySlice';

const LanguageFilter = () => {
  const languageCode = useSelector(
    (state) => state.searchFilters.language_code,
  );
  const dispatch = useDispatch();
  return (
    <Dropdown autoClose="outside" className="facet-btn  mr-3" key="subject">
      <Dropdown.Toggle
        id="{title}-{variant}"
        variant="outline-primary"
        className="font-weight-bold"
        iconAfter={KeyboardArrowDown}
      >
        <p>
          <FormattedMessage
            id="search.facets.language"
            defaultMessage="Language"
          />
          {languageCode.length > 0 && (
            <span className="font-weight-bold">
              : {languageCode.length} items
            </span>
          )}
        </p>
      </Dropdown.Toggle>
      <Dropdown.Menu className="facet-menu">
        <Form.Group>
          <Form.CheckboxSet
            name="color-two"
            onChange={(e) => {
              if (languageCode.includes(e.target.value)) {
                dispatch(
                  setSearchLanguageCode(
                    languageCode.filter((lang) => lang !== e.target.value),
                  ),
                );
              } else {
                dispatch(
                  setSearchLanguageCode([
                    ...languageCode,
                    e.target.value,
                    // LANGUAGE_FILTER_ITEMS.find(
                    //   (lang) => lang.title === e.target.value,
                    // ).code,
                  ]),
                );
              }
            }}
            value={languageCode}
          >
            <Menu>
              {LANGUAGE_FILTER_ITEMS.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center item-wrapper"
                  key={item.id}
                >
                  <MenuItem as={Form.Checkbox} value={item.title}>
                    {item.title}
                  </MenuItem>
                  <span className="mr-2.5">{item.count}</span>
                </div>
              ))}
            </Menu>
          </Form.CheckboxSet>
        </Form.Group>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageFilter;
