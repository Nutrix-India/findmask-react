import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { appStatus, canvasDimensions } from '../../constants';
import Progressbar from '../Progressbar';
import CloseIcon from '../CloseIcon';

const scanAnimation = keyframes`
  0% {
    top: 10px;
  }
  50% {
    top: ${canvasDimensions.height - 10}px;
  }
  100% {
    top: 10px;
  }
`;

const Scanner = styled.div`
  width: ${canvasDimensions.width * 1.2}px;
  height: 2px;
  background-color: red;
  position: absolute;
  top: 10px;
  left: -${canvasDimensions.width * 0.1}px;
  box-shadow: 1px 1px 4px 1px rgb(255 0 0);
  animation-name: ${scanAnimation};
  animation-duration: 3s;
  animation-delay: 500ms;
  animation-timing-funtion: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: normal;
`;

const CanvasContainer = styled.div`
  width: ${canvasDimensions.width}px;
  height: ${canvasDimensions.height}px;
  display: inline-block;
  position: relative;
`;

const iconSize = 30;

const Icon = styled(CloseIcon)`
  position: absolute;
  right: -${iconSize / 2}px;
  top: -${iconSize / 2}px;
`;

const Canvas = styled.canvas`
  background-color: #dcdcdc;
`;

const getWidth = (newHeight, aspectRatio) => newHeight * aspectRatio;
const getHeight = (newWidth, aspectRatio) => newWidth / aspectRatio;

const ImagePreview = ({ image, uploadProgress, responseData, resetState }) => {
  const canvasRef = useRef();
  const imageDataRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const canvasDataRef = useRef({ aspectRatio: canvasDimensions.width / canvasDimensions.height });

  // must use function to override this pointer
  const drawImageOnCanvas = function () {
    const _image = this;
    const aspectRatio = _image.naturalWidth / _image.naturalHeight;
    const imageDimensions = imageDataRef.current;
    if (aspectRatio < canvasDataRef.current.aspectRatio) {
      // width is overflowing
      imageDimensions.height = canvasDimensions.height;
      imageDimensions.y = 0;
      imageDimensions.width = getWidth(canvasDimensions.height, aspectRatio);
      imageDimensions.x = Math.round((canvasDimensions.width - imageDimensions.width) / 2);
    } else {
      // height is overflowing
      imageDimensions.width = canvasDimensions.width;
      imageDimensions.x = 0;
      imageDimensions.height = getHeight(canvasDimensions.width, aspectRatio);
      imageDimensions.y = Math.round((canvasDimensions.height - imageDimensions.height) / 2);
    }

    const context = canvasRef.current.getContext('2d');
    const { x, y, width, height } = imageDimensions;
    context.drawImage(_image, x, y, width, height);
  };

  useEffect(() => {
    if (image.previewUrl) {
      const imageEl = new Image();
      imageEl.src = image.previewUrl;
      imageEl.onload = drawImageOnCanvas;
    } else {
      // clear image
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    }
  }, [image]);

  return (
    <CanvasContainer>
      <Icon onClick={resetState} size={iconSize} />
      <Canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
      />
      {responseData.header === appStatus.uploading && (
        <Progressbar value={uploadProgress} />
      )}
      {responseData.header === appStatus.analyziing && (
        <Scanner />
      )}
    </CanvasContainer>
  );
};

export default ImagePreview;
