import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '@base/Text';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
`;

const Container = styled.div`
  display: inline-block;
  height: 6px;
  border-radius: 8px;
  width: 60%;
  background-color: ${({ theme }) => theme.colors.blueGreenGrey};
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.paleGreen};
  padding-bottom: 4px;
`;

const Bar = styled.div.attrs(({ value }) => ({
  style: {
    width: `${value}%`
  }
}))`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.blueGreen};
  transition: width 300ms ease;
  border-radius: 8px;
`;

const Progressbar = ({ value, borderRadius }) => {
  return (
    <Wrapper $borderRadius={borderRadius}>
      <Title>uploading</Title>
      <Container>
        <Bar value={value} />
      </Container>
    </Wrapper>
  );
};

Progressbar.propTypes = {
  value: PropTypes.number,
  borderRadius: PropTypes.number
};

Progressbar.defaultProps = {
  value: 0,
  borderRadius: 0
};

export default Progressbar;
