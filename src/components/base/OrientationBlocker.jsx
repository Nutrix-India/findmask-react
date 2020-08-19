import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getImage } from '@utils/imageHelper';
import Footer from '@composite/Footer';
import Text from '@base/Text';

const Wrapper = styled.div`
  text-align: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 9999999;
  background-color: ${({ theme }) => theme.colors.paleGreen};
`;

const Image = styled.img`
  padding: 16px;
`;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 60px);
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.blueGreen};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.05rem;
  margin-bottom: 16px;
`;

const OrientationBlocker = () => {
  const showOrientationBlock = useSelector(
    ({ helpers }) => helpers.showOrientationMsg
  );
  return showOrientationBlock ? (
    <Wrapper $width={window.outerWidth} $height={window.outerHeight}>
      <Container>
        <Image src={getImage('/images/rotate.svg')} />
        <Title>Please rotate your device</Title>
        <Text>
          We do not support landscape mode yet, please switch to protrait for
          better experience!
        </Text>
        <Footer />
      </Container>
    </Wrapper>
  ) : null;
};

export default OrientationBlocker;
