import React from 'react';
import { createContext } from 'react';
import { isMobile } from '../utils/deviceHelper';

export const Context = createContext();

export const ContextProvider = ({ children, isServer, userAgent }) => {
  const isMobileDevice = isMobile({ isServer, userAgent });
  return <Context.Provider value={isMobileDevice}>{children}</Context.Provider>;
};