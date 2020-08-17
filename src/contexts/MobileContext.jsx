import { createContext } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from '@utils/deviceHelper';

export const Context = createContext();

export const ContextProvider = ({ children, isServer, userAgent }) => {
  const isMobileDevice = isMobile({ isServer, userAgent });
  return <Context.Provider value={isMobileDevice}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isServer: PropTypes.bool.isRequired,
  userAgent: PropTypes.string.isRequired
};
