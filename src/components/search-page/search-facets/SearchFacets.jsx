import {
  Dropdown, Form, Menu, MenuItem, SearchField,
} from '@edx/paragon';
import { KeyboardArrowDown } from '@edx/paragon/icons';
import { SEARCH_FACET_FILTERS, SUBJECTS_ITEMS_FACET } from '../../../constants';

const SearchFacets = () => (
  <div className="bg-light-300">
    <div className="d-flex py-4 align-items-center custom-container facets-wrapper">
      {SEARCH_FACET_FILTERS.map((facet) => (
        <Dropdown
          autoClose="outside"
          className="mb-0 mr-md-3 facet-btn"
          key={facet.attribute}
        >
          <Dropdown.Toggle
            id="{title}-{variant}"
            variant="outline-primary"
            className="font-weight-bold"
            iconAfter={KeyboardArrowDown}
          >
            <span className="mr-2">{facet.title}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <SearchField
              onSubmit={(value) => console.log(`search submitted: ${value}`)}
              placeholder="Find a ..."
            />
            <Form.Group>
              <Form.CheckboxSet
                name="color-two"
                onChange={(e) => console.log(e.target.value)}
                defaultValue={['green']}
              >
                <Menu>
                  {SUBJECTS_ITEMS_FACET.map((item) => (
                    <div className="d-flex justify-content-between align-items-center item-wrapper" key={item.id}>
                      <MenuItem as={Form.Checkbox} value="red">
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
      ))}
    </div>
  </div>
);

export default SearchFacets;
