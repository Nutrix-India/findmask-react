import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { appStatus } from '../../constants';
import ImagePreview from '../ImagePreview';
import Response from '../Response';

const Wrapper = styled.div`
  text-align: left;
`;

const AnimatedContainer = styled.div`
  padding: 40px;
  display: inline-flex;
  align-items: center;
  ${({ $transform }) => $transform ? `transform: ${$transform}` : ''};
  transition: transform 1s ease;
`;

const setStyle = ({ setTransform, width }) => {
  setTransform(`translateX(${(window.innerWidth - width) / 2}px)`);
};

const PreviewResponse = ({ image, responseData, uploadProgress, resetState }) => {
  const containerRef = useRef();
  const [transform, setTransform] = useState('');
  useEffect(() => {
    const onResize = () => {
      const { width } = containerRef.current.getBoundingClientRect();
      setStyle({ setTransform, width });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const responseWidth = 390;

  useEffect(() => {
    const { width } = containerRef.current.getBoundingClientRect();
    setStyle({
      setTransform,
      width: width + (responseData.header === appStatus.showingResponse ? responseWidth : 0)
    }); // 390px is width of response
  }, [responseData.header]);

  return (
    <Wrapper>
      <AnimatedContainer ref={containerRef} $transform={transform}>
        <ImagePreview image={image} responseData={responseData} uploadProgress={uploadProgress} resetState={resetState} />
        {responseData.header === appStatus.showingResponse && (
          <Response responseData={responseData} responseWidth={responseWidth} />
        )}
      </AnimatedContainer>
    </Wrapper>
  );
};

export default PreviewResponse;
