import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImage } from '@utils/imageHelper';
import { mobile } from '@constants/index';
import AuthorsInfoText from '@base/AuthorsInfoText';

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  padding: 16px;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    flex-direction: column;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandLogo = styled.img`
  height: 12px;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    height: 10px;
  }
`;

const ProductTitle = styled.div`
  font-weight: 200;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05rem;
  position: relative;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    font-size: 12px;
  }
`;

const StyledAuthorsText = styled(AuthorsInfoText)`
  @media only screen and (max-width: ${mobile.maxWidth}) {
    padding-bottom: 8px;
  }
`;

const Footer = ({ className }) => {
  return (
    <Wrapper className={className}>
      <StyledAuthorsText />
      <Product>
        <ProductTitle>&copy; 2020 - All rights reserved. &nbsp;</ProductTitle>
        <div>
          <BrandLogo
            src={getImage('/images/nutrixLogo.svg')}
            alt="nutrix brand logo"
          />
        </div>
      </Product>
    </Wrapper>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

Footer.defaultProps = {
  className: ''
};

export default Footer;
