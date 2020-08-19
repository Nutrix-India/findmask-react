import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mobile } from '@constants/index';
import Text from '@base/Text';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.blueGreen};
  @media only screen and (max-width: ${mobile.maxWidth}) {
    font-size: 12px;
  }
`;

const Link = styled.a.attrs(() => ({ target: '_blank' }))`
  font-size: 12px;
  font-weight: 500;
  :link,
  :visited,
  :hover,
  :active {
    color: ${({ theme }) => theme.colors.nutrixPrimary};
  }
`;

const AuthorsInfoText = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Text>
        {'Made with '}
        <>&#9829;</>
        {' by '}
        <Link href="https://www.linkedin.com/in/vinaykudari/">Vinay</Link>
        &nbsp;
        <Link href="https://www.linkedin.com/in/jaswanth-sai-sattenapalli-b74766128/">
          Jassu
        </Link>
        &nbsp;
        <Link href="https://www.behance.net/chityalava5022">Vaish</Link>
      </Text>
    </Wrapper>
  );
};

AuthorsInfoText.propTypes = {
  className: PropTypes.string
};

AuthorsInfoText.defaultProps = {
  className: ''
};

export default AuthorsInfoText;
