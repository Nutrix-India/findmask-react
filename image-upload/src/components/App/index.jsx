import React, { useContext, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../constants';
import { getImage } from '../../utils/imageHelper';
import ImageInputHandler from '../ImageInputHandler';
import PreviewResponse from '../PreviewResponse';
import Analyze from '../Analyze';
import Footer from '../Footer';
// import MetaTags from '../MetaTags';
import { Context as MobileContext } from '../../context/MobileContext';
import { mobile } from '../../constants';

const Wrapper = styled.div`
  text-align: center;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    position: relative;
    margin-bottom: 40px;
    min-height: calc(100vh - 40px);
  }
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

const App = () => {
  const isMobileDevice = useContext(MobileContext);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://code.tidio.co/ilbww9aamhglal4qndltymn3aondvpdb.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      {/* <MetaTags /> */}
      <Wrapper>
        <Header>
          <AppTitleContainer>
            <AppIcon src={getImage(isMobileDevice ? '/mobileLogoWithText.svg' : '/logoWithText.svg')} />
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

export default App;
