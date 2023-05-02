import { Button, Dropdown, Form } from '@edx/paragon';
import { CloseSmall, KeyboardArrowDown } from '@edx/paragon/icons';
import { useState } from 'react';
import SearchFacetItem from './search-facets/SearchFacetItem';
import { SEARCH_FACET_FILTERS } from '../../../utils/constants';

const SearchFacets = () => {
  const [facetItems, setFacetItems] = useState([]);
  const [value, setValue] = useState();
  const toggleFacetItem = (valueItem) => {
    if (valueItem === 'Courses' || valueItem === 'Programs') {
      setValue();
    }
    if (!facetItems.includes(valueItem)) {
      setFacetItems([...facetItems, valueItem]);
    } else {
      setFacetItems(facetItems.filter((facetItem) => facetItem !== valueItem));
    }
  };
  const handleChange = (e) => {
    if (!facetItems.includes(e.target.value)) {
      setFacetItems([
        ...facetItems.filter((facetItem) => facetItem !== value),
        e.target.value,
      ]);
    }
    setValue(e.target.value);
  };

  return (
    <div className="bg-light-300">
      <div className="d-flex align-items-center custom-container facets-wrapper py-4">
        {SEARCH_FACET_FILTERS.map((facet) => (
          <SearchFacetItem
            facet={facet}
            facetItems={facetItems}
            setFacetItems={setFacetItems}
            key={facet.id}
          />
        ))}
        <Dropdown autoClose="outside" className="facet-btn">
          <Dropdown.Toggle
            id="{title}-{variant}"
            variant="outline-primary"
            className="font-weight-bold "
            iconAfter={KeyboardArrowDown}
          >
            <span className="mr-2">Learning type</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form.Group>
              <Form.RadioSet
                name="color-two"
                onChange={handleChange}
                value={value}
              >
                <Form.Radio value="Courses">
                  <span>Courses</span>
                  <span className="count">635</span>
                </Form.Radio>
                <Form.Radio value="Programs">
                  <span>Programs</span>
                  <span className="count">100</span>
                </Form.Radio>
              </Form.RadioSet>
            </Form.Group>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {facetItems.length > 0 && (
      <div className="custom-container badge-wrapper pb-4">
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
            setValue();
          }}
        >
          Clear all
        </Button>
      </div>
      )}
    </div>
  );
};

export default SearchFacets;
