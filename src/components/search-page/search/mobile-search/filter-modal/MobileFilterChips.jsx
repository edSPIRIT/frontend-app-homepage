import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { CloseSmall } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';
import {
  setSearchInstructors,
  setSearchPartner,
  setSearchSubject,
} from '../../../../../redux/slice/searchQuerySlice';

const MobileFilterChips = () => {
  const filters = useSelector((state) => state.searchFilters);
  const dispatch = useDispatch();
  return (
    <div className="bg-light-200 py-3">
      <div className="custom-container align-items-center badge-wrapper mobile-badge-wrapper">
        {(filters.instructors.length > 0
          || filters.partner.length > 0
          || filters.subject.length > 0
          || filters.language_code.length > 0) && (
          <h5 className="mr-3 font-sm text-gray-500 d-inline">
            <FormattedMessage
              id="filteredBy.text"
              defaultMessage="Filtered by:"
            />
          </h5>
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
      </div>
    </div>
  );
};

export default MobileFilterChips;
