import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { lightTheme } from '@constants/index';
import Home from '@composite/Home';
import { ContextProvider as MobileContextProvider } from '@contexts/MobileContext';
import { initGA, logPageView } from '@utils/googleAnalytics';

const RootPage = ({ isServer, userAgent }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.tidio.co/ilbww9aamhglal4qndltymn3aondvpdb.js';
    script.async = true;
    document.body.appendChild(script);

    if (!window?.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView({ page: window.location.pathname });
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <MobileContextProvider isServer={isServer} userAgent={userAgent}>
        <Home />
      </MobileContextProvider>
    </ThemeProvider>
  );
};

RootPage.propTypes = {
  isServer: PropTypes.bool.isRequired,
  userAgent: PropTypes.string.isRequired
};

RootPage.getInitialProps = ({ req }) => {
  const isServer = !!req;
  return {
    isServer,
    userAgent: isServer ? req.headers['user-agent'] : ''
  };
};

export default RootPage;
