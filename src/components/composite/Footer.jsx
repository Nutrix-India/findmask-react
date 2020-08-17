import React from 'react';
import styled from 'styled-components';
import { getImage } from '@utils/imageHelper';
import { mobile } from '@constants/index';

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
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

const ProductTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.1rem;
  position: relative;
  top: -2px;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Product>
        <ProductTitle>Product of &nbsp;</ProductTitle>
        <div>
          <BrandLogo src={getImage('/images/nutrixLogo.svg')} />
        </div>
      </Product>
    </Wrapper>
  );
};

export default Footer;
