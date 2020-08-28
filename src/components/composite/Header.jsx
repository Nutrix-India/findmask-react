import React, { useContext } from 'react';
import styled from 'styled-components';
import { mobile } from '@constants/index';
import { Context as MobileContext } from '@contexts/MobileContext';
import { getImage } from '@utils/imageHelper';

const Wrapper = styled.div`
  height: 82px;
  background-color: ${({ theme }) => theme.colors.paleGreen};
  position: relative;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    height: 54px;
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

const Header = () => {
  const isMobileDevice = useContext(MobileContext);
  return (
    <Wrapper>
      <AppTitleContainer>
        <AppIcon
          src={getImage(
            isMobileDevice ? '/mobileLogoWithText.svg' : '/logoWithText.svg'
          )}
          alt="logo with title"
        />
      </AppTitleContainer>
    </Wrapper>
  );
};

export default Header;
