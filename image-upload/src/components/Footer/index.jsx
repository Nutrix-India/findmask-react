import React from 'react';
import styled from 'styled-components';
import { getImage } from '../../utils/imageHelper';

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Product>
        Product of &nbsp;
        <img src={getImage('/images/nutrixLogo.svg')} />
      </Product>
    </Wrapper>
  );
};

export default Footer;
