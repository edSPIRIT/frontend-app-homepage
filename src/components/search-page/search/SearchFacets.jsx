import {
  Button,
  Dropdown,
  RadioButton,
  RadioButtonGroup,
} from '@edx/paragon';
import { CloseSmall, KeyboardArrowDown } from '@edx/paragon/icons';
import { useState } from 'react';
import { SEARCH_FACET_FILTERS } from '../../../constants';
import SearchFacetItem from './search-facets/SearchFacetItem';

const SearchFacets = () => {
  const [facetItems, setFacetItems] = useState([]);
  const toggleFacetItem = (value) => {
    if (!facetItems.includes(value)) {
      setFacetItems([...facetItems, value]);
    } else {
      setFacetItems(facetItems.filter((facetItem) => facetItem !== value));
    }
  };
  return (
    <div className="bg-light-300">
      <div className="d-flex align-items-center custom-container facets-wrapper">
        {SEARCH_FACET_FILTERS.map((facet) => (
          <SearchFacetItem
            facet={facet}
            facetItems={facetItems}
            setFacetItems={setFacetItems}
            key={facet.id}
          />
        ))}
        <Dropdown autoClose="outside" className="facet-btn pt-4">
          <Dropdown.Toggle
            id="{title}-{variant}"
            variant="outline-primary"
            className="font-weight-bold "
            iconAfter={KeyboardArrowDown}
          >
            <span className="mr-2">Learning type</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <RadioButtonGroup
              name="rbg"
              label="Radio Button Group"
              className="learning-type-radio"
              onBlur={() => console.log('blurred')}
              onChange={() => console.log('onChange')}
              onClick={() => console.log('onClick')}
              onFocus={() => console.log('onFocus')}
              onKeyDown={() => console.log('onKeyDown')}
            >
              <RadioButton value="jaebaebae">
                <p className="labels-wrapper">
                  <span className="">Courses</span>
                  <span className="mr-2.5 count">635</span>
                </p>
              </RadioButton>
              <RadioButton value="value2">
                <p className="labels-wrapper">
                  <span className="">Programs</span>
                  <span className="mr-2.5 count">100</span>
                </p>
              </RadioButton>
            </RadioButtonGroup>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="custom-container badge-wrapper py-4">
        <span className="mr-3 font-sm">Filtered by:</span>
        {facetItems.map((badge) => (
          <Button
            variant="outline-light"
            size="sm"
            iconAfter={CloseSmall}
            className="badge-btn mr-2"
            key={badge}
            onClick={(e) => {
              toggleFacetItem(e.target.textContent);
            }}
          >
            {badge}
          </Button>
        ))}

        <Button
          variant="tertiary"
          size="sm"
          className="clear-btn"
          onClick={() => {
            setFacetItems([]);
          }}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default SearchFacets;
