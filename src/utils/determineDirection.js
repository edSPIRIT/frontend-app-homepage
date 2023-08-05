/* eslint-disable import/prefer-default-export */
export const determineDirection = (text) => (text.charCodeAt(0) > 127 ? 'rtl' : 'ltr');
