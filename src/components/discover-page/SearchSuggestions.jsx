/* eslint-disable react/no-unescaped-entities */
import { SearchField } from '@edx/paragon';
import classNames from 'classnames';
import React from 'react';

const SearchSuggestions = () => {
  const showSuggestions = true;
  return (
    <div>
      <label
        id="search-input-box"
        className="fe__searchfield-input-box text-brand-primary"
      >
        'header Titlesearch Text'
      </label>

      <SearchField.Advanced className={classNames('fe__searchfield')}>
        <SearchField.Input
          className="form-control-lg"
          aria-labelledby="search-input-box"
          data-nr-synth-id="catalog-search-input-field"
          data-hj-whitelist
          autoComplete="off"
        />
        <SearchField.ClearButton data-nr-synth-id="catalog-search-clear-button" />
        <SearchField.SubmitButton data-nr-synth-id="catalog-search-submit-button" />
      </SearchField.Advanced>
      {showSuggestions && (
        <div className="suggestions" data-testid="suggestions">
          <div>
            <div className="mb-2 ml-2 mt-1 font-weight-bold suggestions-section">
              Courses
            </div>
            <a className="suggestion-item" href="//course/edx+368">
              <div>
                <div>
                  Big wow and Much <em>sa</em>ds
                </div>
                <div className="badge badge-light ml-3 font-weight-light authoring-org-badge">
                  edx
                </div>
              </div>
            </a>
            <a className="suggestion-item" href="//course/edX+DemoX">
              <div>
                <div>
                  edX Demo Course <em>Sa</em>ndbox
                </div>
                <div className="badge badge-light ml-3 font-weight-light authoring-org-badge">
                  edX
                </div>
              </div>
            </a>
            <a className="suggestion-item" href="//course/MattX+SAP1">
              <div>
                <div>
                  <em>SA</em>PTestCourse
                </div>
                <div className="badge badge-light ml-3 font-weight-light authoring-org-badge">
                  MattX
                </div>
              </div>
            </a>
          </div>
          <div>
            <div className="mb-2 mt-5 ml-2 font-weight-bold suggestions-section">
              Programs
            </div>
            <a className="suggestion-item" href="//course/edx+368">
              <div>
                <div>
                  Big wow and Much <em>sa</em>ds
                </div>
                <div className="badge badge-light ml-3 font-weight-light authoring-org-badge">
                  edx
                </div>
              </div>
            </a>
          </div>
          <button type="button" className="btn btn-light w-100 view-all-btn">
            View all results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
