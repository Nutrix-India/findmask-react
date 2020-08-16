import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { apiTypes } from '../../store/actionTypes';
import { canvasDimensions, apiStatus, imageInputModes, mobile } from '../../constants';
import ImagePreview from '../ImagePreview';
import Response from '../Response';
import WebCam from '../WebCam';

const borderRadius = 4;

const PreviewResponseContainer = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: ${canvasDimensions.height + 60}px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
  margin: auto;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    flex-direction: column;
    height: auto;
    min-height: ${canvasDimensions.height + 60}px;
  }
`;

const PreviewResponse = () => {
  const image = useSelector(({ data }) => data.image);
  const isResponseReceived = useSelector(
    ({ apiStatus: apiStatuses }) => apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.successful
  );
  const isWebCamModeActive = useSelector(
    ({ data }) => data.imageInputMode === imageInputModes.takePic
  );

  return (
    <PreviewResponseContainer>
      <Wrapper>
        {image.previewUrl && (
          <ImagePreview borderRadius={borderRadius} />
        )}
        {isResponseReceived && (
          <Response borderRadius={borderRadius} />
        )}
        {!image.previewUrl && isWebCamModeActive && <WebCam />}
      </Wrapper>
    </PreviewResponseContainer>
  );
};

export default PreviewResponse;
