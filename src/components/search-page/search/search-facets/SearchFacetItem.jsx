import {
  Dropdown, Form, Menu, MenuItem, SearchField,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { KeyboardArrowDown } from '@edx/paragon/icons';

const SearchFacetItem = ({ facet, facetItems, setFacetItems }) => {
  const toggleFacetItem = (value) => {
    if (!facetItems.includes(value)) {
      setFacetItems([...facetItems, value]);
    } else {
      setFacetItems(facetItems.filter((facetItem) => facetItem !== value));
    }
  };
  return (
    <Dropdown
      autoClose="outside"
      className="facet-btn pt-4 mr-3"
      key={facet.attribute}
    >
      <Dropdown.Toggle
        id="{title}-{variant}"
        variant="outline-primary"
        className="font-weight-bold"
        iconAfter={KeyboardArrowDown}
      >
        <p className="">
          {facet.title}
          {facet.items.filter((item) => facetItems.includes(item.title))
            .length > 0 && (
            <span className="font-weight-bold">
              :{' '}
              {
                facet.items.filter((item) => facetItems.includes(item.title))
                  .length
              }{' '}
              items
            </span>
          )}
        </p>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <SearchField
          onSubmit={(value) => console.log(`search submitted: ${value}`)}
          placeholder="Find a ..."
        />
        <Form.Group>
          <Form.CheckboxSet
            name="color-two"
            onChange={(e) => {
              toggleFacetItem(e.target.value);
            }}
          >
            <Menu>
              {facet.items.map((item) => (
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
SearchFacetItem.propTypes = {
  facet: {
    id: PropTypes.string,
    attribute: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        count: PropTypes.string,
      }),
    ),
  },
  facetItems: PropTypes.arrayOf(PropTypes.string),
  setFacetItems: PropTypes.func,
};
SearchFacetItem.defaultProps = {
  facet: [],
  facetItems: [],
  setFacetItems: () => {},
};
export default SearchFacetItem;
