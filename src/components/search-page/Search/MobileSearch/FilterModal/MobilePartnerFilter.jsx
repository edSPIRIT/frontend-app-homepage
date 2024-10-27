/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Form,
  FullscreenModal,
  Icon,
  Menu,
  MenuItem,
  SearchField,
  Skeleton,
  useCheckboxSetValues,
  useToggle,
} from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, FormattedNumber, injectIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { setSearchPartners } from '../../../../../redux/slice/searchQuerySlice';
import useGetPartnersFacetInfinite from '../../../../../hooks/useGetPartnersFacetInfinite';
import messages from '../../../../../messages';

const MobilePartnerFilter = ({ intl }) => {
  const [isOpen, open, close] = useToggle(false);
  const partners = useSelector((state) => state.searchFilters.partners);
  const dispatch = useDispatch();
  const [partnerValues, {
    add, remove, clear, set,
  }] = useCheckboxSetValues([]);

  const [searchString, setSearchString] = useState('');
  const { ref, inView } = useInView();
  const { partnersFilterItems, loading, isFetching } = useGetPartnersFacetInfinite(searchString, inView);

  // Filter out duplicate partner names
  const uniquePartners = partnersFilterItems?.filter(
    (item, index, self) => index === self.findIndex((t) => t.organization.name === item.organization.name),
  );

  const handleChange = (e) => {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };

  useEffect(() => {
    clear();
    if (partners.length > 0) {
      set(partners);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partners, isOpen]);

  return (
    <>
      <FullscreenModal
        className="filter-modal"
        isOpen={isOpen}
        onClose={() => close()}
      >
        <div className="d-flex align-items-center justify-content-between p-3 modal-header-wrapper">
          <Icon
            src={ArrowBack}
            loadPages
            onClick={() => {
              close();
            }}
            className="mx-2 "
          />
          <h4>
            <FormattedMessage
              id="search.facets.partner"
              defaultMessage="Partner"
            />
          </h4>
          <Button
            variant="tertiary"
            size="sm"
            className="reset-btn"
            onClick={() => clear()}
          >
            <FormattedMessage id="reset.text" defaultMessage="Reset" />
          </Button>
        </div>
        <div className="facet-menu mobile-facet-menu h-100 d-flex flex-column">
          <SearchField
            onChange={(value) => setSearchString(value)}
            onSubmit={(value) => setSearchString(value)}
            placeholder={intl.formatMessage(messages['partners.search.find'])}
            inputProps={{
              autoComplete: 'off',
            }}
          />
          <div className="d-flex flex-column justify-content-between h-100">
            <Form.Group>
              <Form.CheckboxSet
                name="color-two"
                onChange={(e) => handleChange(e)}
                value={partnerValues}
              >
                <Menu>
                  {uniquePartners?.length === 0 && searchString && (
                    <span className="text-gray-500 no-result">
                      <FormattedMessage
                        id="search.noResult.text"
                        defaultMessage="We couldn't find any exact matches"
                      />
                    </span>
                  )}
                  {uniquePartners?.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center item-wrapper"
                      key={item.organization.id}
                    >
                      <MenuItem
                        className="pl-2 truncate-mobile-text"
                        as={Form.Checkbox}
                        value={item.organization.name}
                      >
                        {item.organization.name}
                      </MenuItem>
                      <span className="pr-4">
                        <FormattedNumber value={item.courses_count} />
                      </span>
                    </div>
                  ))}
                  <div ref={ref} />
                  {(loading || isFetching) && (
                    <div className="d-flex pl-3 justify-content-between">
                      <div className="d-flex ">
                        <Skeleton className="mr-2" width={18} height={18} />
                        <Skeleton className="" width={90} height={18} />
                      </div>
                      <Skeleton className="mr-2" width={15} height={18} />
                    </div>
                  )}
                </Menu>
              </Form.CheckboxSet>
            </Form.Group>
            <div className="p-4 sticky-bottom">
              <Button
                variant="brand"
                className="w-100"
                onClick={() => {
                  dispatch(setSearchPartners(partnerValues));
                  close();
                }}
              >
                <FormattedMessage
                  id="search.Apply.button"
                  defaultMessage="Apply"
                />
              </Button>
            </div>
          </div>
        </div>
      </FullscreenModal>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => open()}
      >
        <p className="font-sm d-flex justify-content-center align-items-center py-2">
          <FormattedMessage
            id="search.facets.partner"
            defaultMessage="Partner"
          />
          {partners.length > 0 && (
            <span className="font-weight-bold ml-1 text-brand-500">{`(${partners.length})`}</span>
          )}
        </p>
        <Icon src={ArrowForwardIos} />
      </div>
    </>
  );
};

export default injectIntl(MobilePartnerFilter);
