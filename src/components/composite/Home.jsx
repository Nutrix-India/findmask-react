import React from 'react';
import styled from 'styled-components';
import ImageInputHandler from '@composite/ImageInputHandler';
import PreviewResponse from '@composite/PreviewResponse';
import Analyze from '@composite/Analyze';
import Footer from '@composite/Footer';
import Header from '@composite/Header';
// import OrientationBlocker from '@base/OrientationBlocker';
// import useMobileOrientationHandler from '@hooks/useMobileOrientationHandler';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  min-height: calc(100vh - 120px);
`;

const Home = () => {
  // useMobileOrientationHandler();
  return (
    <>
      {/* <OrientationBlocker /> */}
      <Wrapper>
        <Header />
        <ImageInputHandler />
        <PreviewResponse />
        <Analyze />
        <Footer />
      </Wrapper>
    </>
  );
};

export default Home;
