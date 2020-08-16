import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { apiTypes } from '../../store/actionTypes';
import { resetData } from '../../store/actions';
import { canvasDimensions, apiStatus } from '../../constants';
import { getImage } from '../../utils/imageHelper';
import Progressbar from '../Progressbar';
import RoundedIcon from '../RoundedIcon';

const scanAnimation = keyframes`
  0% {
    top: 10px;
  }
  50% {
    top: calc(100% - 10px);
  }
  100% {
    top: 10px;
  }
`;

const Scanner = styled.div`
  width: 120%;
  height: 2px;
  background-color: red;
  position: absolute;
  top: 10px;
  left: -10%;
  box-shadow: 1px 1px 4px 1px rgb(255 0 0);
  animation-name: ${scanAnimation};
  animation-duration: 3s;
  animation-timing-funtion: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: normal;
`;

const fadeInScaleAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CanvasContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  opacity: 0;
  transform: scale(0.5);
  animation-name: ${fadeInScaleAnimation};
  animation-duration: 800ms;
  animation-timing-funtion: ease-out;
  animation-fill-mode: forwards;
`;

const iconSize = 28;

const Icon = styled(RoundedIcon)`
  position: absolute;
  right: -${iconSize / 2}px;
  top: -${iconSize / 2}px;
`;

const Canvas = styled.canvas`
  background-color: #dcdcdc;
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
`;

const getWidth = (newHeight, aspectRatio) => newHeight * aspectRatio;
const getHeight = (newWidth, aspectRatio) => newWidth / aspectRatio;

// const getOriginalX = ({ transformedX, imageX }) => {
//   Math.round(transformedX / imageX *);
// }

// const getOriginalY = ({ transformedY, imageY }) => {
//   Math.round(transformedY / imgDimensions.height * imageY);
// }

const ImagePreview = ({ className, borderRadius }) => {
  const canvasRef = useRef();
  const image = useSelector(({ data }) => data.image);
  const isResponseReceived = useSelector(
    ({ apiStatus: apiStatuses }) => apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.successful
  );
  const response = useSelector(({ data }) => data.response);
  const uploadProgress = useSelector(
    ({ apiStatus: apiStatuses }) => apiStatuses[apiTypes.SEND_FOR_ANALYSIS].uploadProgress
  );
  const isRequesting = useSelector(
    ({ apiStatus: apiStatuses }) => apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.requesting
  );
  const isAnalyzing = isRequesting && uploadProgress === 100;
  const isUploading = isRequesting && uploadProgress < 100;
  const [imageDimensions, setImageDimensions] = useState({ 
    width: canvasDimensions.width,
    height: canvasDimensions.height
  });
  const canvasDataRef = useRef({ aspectRatio: canvasDimensions.width / canvasDimensions.height });
  const actualImageDimensions = useRef({
    width: 0,
    height: 0
  });

  // must use function to override this pointer
  const drawImageOnCanvas = function () {
    const _image = this;
    actualImageDimensions.current.width = _image.naturalWidth;
    actualImageDimensions.current.height = _image.naturalHeight;
    const aspectRatio = _image.naturalWidth / _image.naturalHeight;
    const dimensions = {
      width: 0,
      height: 0
    };
    if (aspectRatio < canvasDataRef.current.aspectRatio) {
      // width is overflowing
      dimensions.height = canvasDimensions.height;
      dimensions.width = getWidth(canvasDimensions.height, aspectRatio);
    } else {
      // height is overflowing
      dimensions.width = canvasDimensions.width;
      dimensions.height = getHeight(canvasDimensions.width, aspectRatio);
    }

    setImageDimensions({ ...dimensions });

    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = dimensions;
    ctx.drawImage(_image, 0, 0, width, height);
  };

  useEffect(() => {
    if (image.previewUrl) {
      const imageEl = new Image();
      imageEl.src = image.previewUrl;
      imageEl.onload = drawImageOnCanvas;
    } else {
      // clear image
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    }
  }, [image.previewUrl]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (isResponseReceived) {
      // mark faces
      const allFaces = response.image_details.face.id;
      const maskedFaceColor = 'green';
      const faceColor = 'red';
      Object.keys(allFaces).forEach((faceId) => {
        const face = allFaces[faceId];
        let targetColor = faceColor;
        if (face.mask_confidence > 0.94) {
          targetColor = maskedFaceColor;
        }
        const {x1: x, y1: y, width, height} = face.face_coordinates;
        // const [
        //   originalX,
        //   originalY,
        //   originalWidth,
        //   originalHeight
        // ] = [
        //   getOriginalX({ transformedX: x, imageX: actualImageDimensions.current.width }),
        //   getOriginalY({ transformedY: y, imageY: actualImageDimensions.current.height }),
        //   getOriginalX({ transformedX: width, imageX: actualImageDimensions.current.width }),
        //   getOriginalY({ transformedY: height, imageY: actualImageDimensions.current.height })
        // ];
        // draw face
        ctx.strokeStyle = targetColor;
        ctx.strokeRect(x, y, width, height);
      });
    }
  }, [isResponseReceived]);

  const dispatch = useDispatch();
  const onCloseClick = () => {
    dispatch(resetData());
    dispatch({ type: `${apiTypes.SEND_FOR_ANALYSIS}_RESET_API_CALL` });
    dispatch({ type: `${apiTypes.SEND_FEEDBACK}_RESET_API_CALL` });
  };

  return (
    <CanvasContainer
      className={className || ''}
      width={imageDimensions.width}
      height={imageDimensions.height}
      $borderRadius={borderRadius}
    >
      <Icon onClick={onCloseClick} size={iconSize} imgSrc={getImage('/images/close.svg')} />
      <Canvas
        ref={canvasRef}
        width={imageDimensions.width}
        height={imageDimensions.height}
        $borderRadius={borderRadius}
      />
      {isUploading && (
        <Progressbar value={uploadProgress} borderRadius={borderRadius} />
      )}
      {isAnalyzing && <Scanner />}
    </CanvasContainer>
  );
};

export default ImagePreview;
