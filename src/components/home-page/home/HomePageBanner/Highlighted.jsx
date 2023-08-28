import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'lodash.escaperegexp';

const Highlighted = ({ text, highlight }) => {
  console.log('test', text, highlight);
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts
        .filter((part) => part)
        .map((part, i) => (regex.test(part) ? (
          <span
            className="highlighted-banner"
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            {part}
          </span>
        ) : (
        // eslint-disable-next-line react/no-array-index-key
          <span key={i}>{part}</span>
        )))}
    </>
  );
};

Highlighted.defaultProps = {
  text: '',
  highlight: '',
};

Highlighted.propTypes = {
  text: PropTypes.string,
  highlight: PropTypes.string,
};

export default Highlighted;
