import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { CloseSmall } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';
import {
  setSearchInstructors,
  setSearchLanguageCodes,
  setSearchPartners,
  setSearchString,
  setSearchSubject,
} from '../../../../../redux/slice/searchQuerySlice';
import { getLangName } from '../../../../../utils/supportsLanguages';

const MobileFilterChips = () => {
  const filters = useSelector((state) => state.searchFilters);
  const dispatch = useDispatch();
  return (
    <div className="bg-light-200 py-3">
      <div className="custom-container align-items-center badge-wrapper mobile-badge-wrapper">
        {(filters.instructors.length > 0
          || filters.search_string.length > 0
          || filters.partners.length > 0
          || filters.subjects.length > 0
          || filters.language_codes.length > 0) && (
          <h5 className="mr-3 font-sm text-gray-500 d-inline">
            <FormattedMessage
              id="filteredBy.text"
              defaultMessage="Filtered by:"
            />
          </h5>
        )}
        {filters.search_string.length > 0
          && (
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
      </div>
    </div>
  );
};

export default MobileFilterChips;
