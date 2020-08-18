import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { lightTheme } from '@constants/index';
import ImageInputHandler from '@composite/ImageInputHandler';
import PreviewResponse from '@composite/PreviewResponse';
import Analyze from '@composite/Analyze';
import Footer from '@composite/Footer';
import Header from '@composite/Header';
import { ContextProvider as MobileContextProvider } from '@contexts/MobileContext';
import { initGA, logPageView } from '@utils/googleAnalytics';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  min-height: calc(100vh - 60px);
`;

const Home = ({ isServer, userAgent }) => {
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
        <Wrapper>
          <Header />
          <ImageInputHandler />
          <PreviewResponse />
          <Analyze />
          <Footer />
        </Wrapper>
      </MobileContextProvider>
    </ThemeProvider>
  );
};

Home.propTypes = {
  isServer: PropTypes.bool.isRequired,
  userAgent: PropTypes.string.isRequired
};

Home.getInitialProps = ({ req }) => {
  const isServer = !!req;
  return {
    isServer,
    userAgent: isServer ? req.headers['user-agent'] : ''
  };
};

export default Home;
