import React, { useContext, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, mobile } from '@constants/index';
import { getImage } from '@utils/imageHelper';
import ImageInputHandler from '@composite/ImageInputHandler';
import PreviewResponse from '@composite/PreviewResponse';
import Analyze from '@composite/Analyze';
import Footer from '@composite/Footer';
import MetaTags from '@composite/MetaTags';
import { Context as MobileContext } from '@contexts/MobileContext';
import { initGA, logPageView } from '@utils/googleAnalytics';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  min-height: calc(100vh - 40px);
`;

const Header = styled.div`
  height: 82px;
  background-color: ${({ theme }) => theme.colors.paleGreen};
  position: relative;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    height: 46px;
  }
`;

const AppTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: -30px;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    bottom: -13px;
  }
`;

const AppIcon = styled.img``;

const Home = () => {
  const isMobileDevice = useContext(MobileContext);
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
      <MetaTags />
      <Wrapper>
        <Header>
          <AppTitleContainer>
            <AppIcon
              src={getImage(
                isMobileDevice ? '/mobileLogoWithText.svg' : '/logoWithText.svg'
              )}
            />
          </AppTitleContainer>
        </Header>
        <ImageInputHandler />
        <PreviewResponse />
        <Analyze />
        <Footer />
      </Wrapper>
      {/* <script src="https://code.tidio.co/ilbww9aamhglal4qndltymn3aondvpdb.js" async /> */}
    </ThemeProvider>
  );
};

export default Home;
