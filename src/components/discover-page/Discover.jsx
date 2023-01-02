import { Chip, SearchField } from '@edx/paragon';
import classNames from 'classnames';
import React from 'react';

const Discover = () => {
  const trendingChips = ['Python', 'Exel', 'Data Sciences', 'Marketing'];
  const showSuggestions = true;
  return (
    <main>
      <div className="search-header-wrapper">
        <div className="custom-container">
          <span className="search-header mb-4.5">
            Search our Catalog
          </span>
          <SearchField
            className="discover-search-field mb-4"
            submitButtonLocation="external"
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder="What do you want to learn?"
          />
          <div>

            /* eslint-disable-next-line jsx-a11y/label-has-associated-control */
            <label id="search-input-box" className="fe__searchfield-input-box text-brand-primary">
              'headerTitlesearchText'
            </label>

            <SearchField.Advanced
              className={classNames('fe__searchfield')}
              // value={defaultRefinement}
              // onSubmit={handleSubmit}
              // onClear={handleClear}
              // onChange={(query) => {
              //   setSearchQuery(query);
              // }}
            >
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
            { showSuggestions && (
            <div className="suggestions" data-testid="suggestions">
              <div>
                <div className="mb-2 ml-2 mt-1 font-weight-bold suggestions-section">
                  Courses
                </div>
                <a className="suggestion-item" href="//course/edx+368"><div><div>Big wow and Much <em>sa</em>ds</div><div className="badge badge-light ml-3 font-weight-light authoring-org-badge">edx</div></div></a>
                <a className="suggestion-item" href="//course/edX+DemoX"><div><div>edX Demo Course <em>Sa</em>ndbox</div><div className="badge badge-light ml-3 font-weight-light authoring-org-badge">edX</div></div></a>
                <a className="suggestion-item" href="//course/MattX+SAP1"><div><div><em>SA</em>PTestCourse</div><div className="badge badge-light ml-3 font-weight-light authoring-org-badge">MattX</div></div></a>
              </div>
              <div>
                <div className="mb-2 mt-5 ml-2 font-weight-bold suggestions-section">
                  Programs
                </div>
                <a className="suggestion-item" href="//course/edx+368"><div><div>Big wow and Much <em>sa</em>ds</div><div className="badge badge-light ml-3 font-weight-light authoring-org-badge">edx</div></div></a>
              </div>
              <button type="button" className="btn btn-light w-100 view-all-btn">
                View all results
              </button>
            </div>
            )}
          </div>
          <div className="d-flex align-items-center">
            <span className="trending-title mr-4">
              Trending:
            </span>
            <div>
              {trendingChips.map((chip) => <Chip key={chip} className="chip-trend mr-2">{chip}</Chip>)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Discover;
