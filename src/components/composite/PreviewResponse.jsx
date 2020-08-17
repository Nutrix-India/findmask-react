import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { apiTypes } from '@actionTypes/index';
import { apiStatus, imageInputModes, mobile } from '@constants/index';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import ImagePreview from '@composite/ImagePreview';
import Response from '@composite/Response';
import WebCam from '@composite/WebCam';

const borderRadius = 4;

const PreviewResponseContainer = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: ${({ $height }) => $height + 60}px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
  margin: auto;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    flex-direction: column;
    height: auto;
    min-height: ${({ $height }) => $height + 60}px;
  }
`;

const PreviewResponse = () => {
  const image = useSelector(({ data }) => data.image);
  const isResponseReceived = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.successful
  );
  const isWebCamModeActive = useSelector(
    ({ data }) => data.imageInputMode === imageInputModes.takePic
  );
  const canvasDimensions = useCanvasDimensions();
  return (
    <PreviewResponseContainer>
      <Wrapper $height={canvasDimensions.height}>
        {image.previewUrl && <ImagePreview borderRadius={borderRadius} />}
        {isResponseReceived && <Response borderRadius={borderRadius} />}
        {!image.previewUrl && isWebCamModeActive && <WebCam />}
      </Wrapper>
    </PreviewResponseContainer>
  );
};

export default PreviewResponse;
