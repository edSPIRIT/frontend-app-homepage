import { Button } from '@edx/paragon';
import { CloseSmall } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import SubjectFilter from './SearchFacets/SubjectFilter';
import PartnerFilter from './SearchFacets/PartnerFilter';
import InstructorsFilter from './SearchFacets/InstructorsFilter';
import LanguageFilter from './SearchFacets/LanguageFilter';
import {
  resetSearchFilters,
  setSearchInstructors,
  setSearchLanguageCodes,
  setSearchPartners,
  setSearchString,
  setSearchSubject,
} from '../../../../redux/slice/searchQuerySlice';
import { getLangName } from '../../../../utils/transcriptLang';
import useGetInstructorsFacetInfinite from '../../../../hooks/useGetInstructorsFacetInfinite';

const SearchFacets = () => {
  const filters = useSelector((state) => state.searchFilters);
  const dispatch = useDispatch();
  const { instructorsFilterItems } = useGetInstructorsFacetInfinite('', true);

  // Create a map of slug to name for quick lookup
  const instructorSlugToName = React.useMemo(() => instructorsFilterItems.reduce((acc, instructor) => {
    acc[instructor.slug] = instructor.name;
    return acc;
  }, {}), [instructorsFilterItems]);

  return (
    <div className="bg-light-300">
      <div className="d-flex align-items-center custom-container facets-wrapper py-4">
        <SubjectFilter />
        <PartnerFilter />
        <InstructorsFilter />
        <LanguageFilter />
        {/* <AvailabilityFilter /> */}

        {/* <Dropdown autoClose="outside" className="facet-btn">
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
        </Dropdown> */}
      </div>

      <div className="custom-container badge-wrapper pb-4">
        {(filters.instructors.length > 0
          || filters.search_string.length > 0
          || filters.partners.length > 0
          || filters.subjects.length > 0
          || filters.language_codes.length > 0) && (
          <span className="mr-3 font-sm">
            <FormattedMessage
              id="filteredBy.text"
              defaultMessage="Filtered by:"
            />
          </span>
        )}
        {filters.search_string.length > 0 && (
          <Button
            variant="outline-light"
            size="sm"
            iconAfter={CloseSmall}
            className="badge-btn mr-2"
            onClick={() => dispatch(setSearchString(''))}
          >
            {filters.search_string}
          </Button>
        )}
        {filters.subjects.length > 0
          && filters.subjects.map((badge) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={badge}
              onClick={() => dispatch(
                setSearchSubject(
                  filters.subjects.filter((sub) => sub !== badge),
                ),
              )}
            >
              {badge}
            </Button>
          ))}
        {filters.partners.length > 0
          && filters.partners.map((badge) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={badge}
              onClick={() => dispatch(
                setSearchPartners(
                  filters.partners.filter((partner) => partner !== badge),
                ),
              )}
            >
              {badge}
            </Button>
          ))}
        {filters.instructors.length > 0
          && filters.instructors.map((slug) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={slug}
              onClick={() => dispatch(
                setSearchInstructors(
                  filters.instructors.filter(
                    (instructor) => instructor !== slug,
                  ),
                ),
              )}
            >
              {instructorSlugToName[slug] || slug}
            </Button>
          ))}
        {filters.language_codes.length > 0
          && filters.language_codes.map((langCode) => (
            <Button
              variant="outline-light"
              size="sm"
              iconAfter={CloseSmall}
              className="badge-btn mr-2"
              key={langCode}
              onClick={() => dispatch(
                setSearchLanguageCodes(
                  filters.language_codes.filter((lang) => lang !== langCode),
                ),
              )}
            >
              {getLangName(langCode)}
            </Button>
          ))}

        {(filters.instructors.length > 0
          || filters.search_string.length > 0
          || filters.partners.length > 0
          || filters.subjects.length > 0
          || filters.language_codes.length > 0) && (
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
