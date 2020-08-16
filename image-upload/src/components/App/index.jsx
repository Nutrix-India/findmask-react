import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../constants';
import { getImage } from '../../utils/imageHelper';
import ImageInputHandler from '../ImageInputHandler';
import PreviewResponse from '../PreviewResponse';
import Analyze from '../Analyze';
import Footer from '../Footer';
import { Context as MobileContext } from '../../context/MobileContext';
import { mobile } from '../../constants';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.div`
  height: 82px;
  background-color: ${({ theme }) => theme.colors.paleGreen};
  position: relative;
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
  return (
    <ThemeProvider theme={lightTheme}>
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
    </ThemeProvider>
  );
};

export default App;
