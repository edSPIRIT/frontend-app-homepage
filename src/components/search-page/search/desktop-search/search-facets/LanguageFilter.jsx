import {
  Dropdown, Form, Menu, MenuItem, Skeleton,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { setSearchLanguageCodes } from '../../../../../redux/slice/searchQuerySlice';
import {
  codeToTitle, getLangCode,
} from '../../../../../utils/supportsLanguages';
import useGetLanguagesFilter from '../../../../../hooks/useGetLanguagesFilter';

const LanguageFilter = () => {
  const languageCodes = useSelector(
    (state) => state.searchFilters.language_codes,
  );
  const dispatch = useDispatch();
  const { languagesFilter, loading } = useGetLanguagesFilter();
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
          {languageCodes.length > 0 && (
            <span className="font-weight-bold">
              : {languageCodes.length} items
            </span>
          )}
        </p>
      </Dropdown.Toggle>
      <Dropdown.Menu className="facet-menu">
        <Form.Group>
          <Form.CheckboxSet
            name="color-two"
            onChange={(e) => {
              if (languageCodes.includes(getLangCode(e.target.value))) {
                dispatch(
                  setSearchLanguageCodes(
                    languageCodes.filter((lang) => lang !== getLangCode(e.target.value)),
                  ),
                );
              } else {
                dispatch(
                  setSearchLanguageCodes([
                    ...languageCodes,
                    getLangCode(e.target.value),
                  ]),
                );
              }
            }}
            value={codeToTitle(languageCodes)}
          >
            <Menu>
              {languagesFilter?.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center item-wrapper"
                  key={item.code}
                >
                  <MenuItem as={Form.Checkbox} value={item.name}>
                    {item.name}
                  </MenuItem>
                  <span className="mr-3">{item.course_count}</span>
                </div>
              ))}
              {(loading) && (
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
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageFilter;
