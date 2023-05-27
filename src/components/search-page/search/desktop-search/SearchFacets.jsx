import { Button, Dropdown, Form } from '@edx/paragon';
import { CloseSmall, KeyboardArrowDown } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import SubjectFilter from './search-facets/SubjectFilter';
import PartnerFilter from './search-facets/PartnerFilter';
import InstructorsFilter from './search-facets/InstructorsFilter';
import LanguageFilter from './search-facets/LanguageFilter';
import AvailabilityFilter from './search-facets/AvailabilityFilter';
import {
  resetSearchFilters,
  setSearchInstructors,
  setSearchPartner,
  setSearchSubject,
} from '../../../../redux/slice/searchQuerySlice';

const SearchFacets = () => {
  const filters = useSelector((state) => state.searchFilters);
  const dispatch = useDispatch();

  return (
    <div className="bg-light-300">
      <div className="d-flex align-items-center custom-container facets-wrapper py-4">
        <SubjectFilter />
        <PartnerFilter />
        <InstructorsFilter />
        <LanguageFilter />
        <AvailabilityFilter />

        <Dropdown autoClose="outside" className="facet-btn">
          <Dropdown.Toggle
            id="{title}-{variant}"
            variant="outline-primary"
            className="font-weight-bold "
            iconAfter={KeyboardArrowDown}
          >
            <span className="mr-2">
              <FormattedMessage
                id="search.facets.learningType"
                defaultMessage="Learning type"
              />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form.Group>
              <Form.RadioSet
                name="color-two"
                // onChange={handleChange}
                // value={value}
              >
                <Form.Radio value="Courses">
                  <FormattedMessage
                    id="courses.text"
                    defaultMessage="Courses"
                  />
                  <span className="count">635</span>
                </Form.Radio>
                <Form.Radio value="Programs">
                  <FormattedMessage
                    id="programs.text"
                    defaultMessage="Programs"
                  />
                  <span className="count">100</span>
                </Form.Radio>
              </Form.RadioSet>
            </Form.Group>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="custom-container badge-wrapper pb-4">
        {(filters.instructors.length > 0
          || filters.partner.length > 0
          || filters.subject.length > 0
          || filters.language_code.length > 0) && (
          <span className="mr-3 font-sm">
            <FormattedMessage
              id="filteredBy.text"
              defaultMessage="Filtered by:"
            />
          </span>
        )}
        {filters.subject.length > 0
          && filters.subject.map((badge) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={badge}
              onClick={() => dispatch(
                setSearchSubject(
                  filters.subject.filter((sub) => sub !== badge),
                ),
              )}
            >
              {badge}
            </Button>
          ))}
        {filters.partner.length > 0
          && filters.partner.map((badge) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={badge}
              onClick={() => dispatch(
                setSearchPartner(
                  filters.partner.filter((partner) => partner !== badge),
                ),
              )}
            >
              {badge}
            </Button>
          ))}
        {filters.instructors.length > 0
          && filters.instructors.map((badge) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={badge}
              onClick={() => dispatch(
                setSearchInstructors(
                  filters.instructors.filter(
                    (instructor) => instructor !== badge,
                  ),
                ),
              )}
            >
              {badge}
            </Button>
          ))}
        {filters.language_code.length > 0
          && filters.language_code.map((badge) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={badge}
              onClick={() => dispatch(
                setSearchInstructors(
                  filters.language_code.filter((lang) => lang !== badge),
                ),
              )}
            >
              {badge}
            </Button>
          ))}

        {(filters.instructors.length > 0
          || filters.partner.length > 0
          || filters.subject.length > 0
          || filters.language_code.length > 0) && (
          <Button
            variant="tertiary"
            size="sm"
            className="clear-btn"
            onClick={() => dispatch(resetSearchFilters())}
          >
            <FormattedMessage id="clearAll.text" defaultMessage="Clear all" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFacets;
