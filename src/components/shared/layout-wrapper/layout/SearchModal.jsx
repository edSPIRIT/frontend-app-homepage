import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Button, FullscreenModal, Icon, SearchField,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBack, Close } from '@edx/paragon/icons';
import { closeSearchModal } from '../../../../redux/slice/searchModalSlice';
import messages from '../../../../messages';
import { RECENTLY_VIEWED, TRENDING_COURSES, TRENDING_WORDS } from '../../../../utils/constants';

const SearchModal = ({ intl }) => {
  const dispatch = useDispatch();
  const isOpenSearchModal = useSelector((state) => state.searchModal.open);
  return (
    <FullscreenModal
      className="search-modal"
      isOpen={isOpenSearchModal}
      onClose={() => dispatch(closeSearchModal())}
    >
      <div className="d-flex align-items-center search-wrapper">
        <Icon
          src={ArrowBack}
          onClick={() => dispatch(closeSearchModal())}
          className="mr-1.5"
        />
        <SearchField
          onSubmit={(value) => console.log(`search submitted: ${value}`)}
          placeholder={intl.formatMessage(
            messages['header.search.placeholder'],
          )}
        />
      </div>
      <div className="p-4 recent-view-wrapper">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Recently viewed</h4>
          <span className="font-sm">Clear all</span>
        </div>
        {RECENTLY_VIEWED.map((recentView) => (
          <div
            className="d-flex align-items-center mb-2.5"
            key={recentView.title}
          >
            <div className="logo-img-wrapper ">
              <img src={recentView.logo} alt="org-logo" />
            </div>

            <div className="d-flex justify-content-between align-items-center w-100">
              <div>
                <p className="recent-title">{recentView.title}</p>
                <p className="recent-institution">{recentView.institution}</p>
              </div>
              <Icon src={Close} className=" " />
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column px-4">
        <h4 className="mb-3">Trending keywords</h4>
        <div>
          {TRENDING_WORDS.map((word, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Button key={i} variant="outline-primary" className="mr-2">
              {word}
            </Button>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column px-4 mt-3">
        <h4 className="mb-3">Trending courses</h4>
        <div>
          {TRENDING_COURSES.map((course) => (
            <div className="mb-2.5" key={course.title}>
              <p className="mb-2">{course.title}</p>
              <p className="text-gray-500 font-xs">{course.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </FullscreenModal>
  );
};

SearchModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchModal);
