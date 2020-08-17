import React from 'react';
import styled from 'styled-components';
import { getImage } from '@utils/imageHelper';
import { mobile } from '@constants/index';

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandLogo = styled.img`
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 76px;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Product>
        Product of &nbsp;
        <BrandLogo src={getImage('/images/nutrixLogo.svg')} />
      </Product>
    </Wrapper>
  );
};

export default Footer;
