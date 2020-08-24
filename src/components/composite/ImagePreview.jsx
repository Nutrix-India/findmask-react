import React, { useRef, useEffect, useState, useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { apiTypes } from '@actionTypes/index';
import { resetData } from '@actions/index';
import { apiStatus, mobile } from '@constants/index';
import { getImage } from '@utils/imageHelper';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import Progressbar from '@base/Progressbar';
import RoundedIcon from '@base/RoundedIcon';
import Download from '@base/Download';

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
  animation-iteration-count: infinite;
  animation-direction: normal;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 108%;
    left: -4%;
  }
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

const DownloadBtn = styled(Download)`
  position: absolute;
  left: 8px;
  bottom: 8px;
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
  const canvasDimensions = useCanvasDimensions();
  const theme = useContext(ThemeContext);
  const canvasRef = useRef();
  const image = useSelector(({ data }) => data.image);
  const isResponseReceived = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.successful
  );
  const response = useSelector(({ data }) => data.response);
  const uploadProgress = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].uploadProgress || 0
  );
  const isRequesting = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.SEND_FOR_ANALYSIS].status === apiStatus.requesting
  );
  const isAnalyzing = isRequesting && uploadProgress === 100;
  const isUploading = isRequesting && uploadProgress < 100;
  const [imageDimensions, setImageDimensions] = useState({
    width: canvasDimensions.width,
    height: canvasDimensions.height
  });
  const canvasDataRef = useRef({
    aspectRatio: canvasDimensions.width / canvasDimensions.height
  });
  const actualImageDimensions = useRef({
    width: 0,
    height: 0
  });

  // must use function to override this pointer
  // eslint-disable-next-line func-names
  const drawImageOnCanvas = function () {
    // eslint-disable-next-line no-underscore-dangle
    const _image = this;
    actualImageDimensions.current.width = _image.naturalWidth;
    actualImageDimensions.current.height = _image.naturalHeight;
    const aspectRatio = _image.naturalWidth / _image.naturalHeight;
    const dimensions = {
      width: 0,
      height: 0
    };
    if (
      aspectRatio < canvasDataRef.current.aspectRatio &&
      _image.naturalWidth > canvasDimensions.width
    ) {
      // width is overflowing
      dimensions.height = canvasDimensions.height;
      dimensions.width = getWidth(canvasDimensions.height, aspectRatio);
    } else if (_image.naturalHeight > canvasDimensions.height) {
      // height is overflowing
      dimensions.width = canvasDimensions.width;
      dimensions.height = getHeight(canvasDimensions.width, aspectRatio);
    } else {
      dimensions.width = _image.naturalWidth;
      dimensions.height = _image.naturalHeight;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasDimensions.height, canvasDimensions.width, image.previewUrl]);

  const threshold = useSelector(({ data }) => data.threshold);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (isResponseReceived) {
      // mark faces
      const allFaces = response.image_details.face.id;
      const properMaskFaceColor = theme.colors.green;
      const improperMaskFaceColor = theme.colors.yellow;
      const faceColor = theme.colors.red;
      Object.keys(allFaces).forEach((faceId) => {
        const face = allFaces[faceId];
        let targetColor = faceColor;
        if (
          face.proper_mask_confidence >= threshold.proper_mask_detection_thresh
        ) {
          targetColor = properMaskFaceColor;
        } else if (
          face.improper_mask_confidence >=
          threshold.improper_mask_detection_thresh
        ) {
          targetColor = improperMaskFaceColor;
        }
        const { x1: x, y1: y, width, height } = face.face_coordinates;
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
        ctx.lineWidth = 3;
        ctx.strokeStyle = targetColor;
        ctx.strokeRect(x, y, width, height);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponseReceived, theme.colors.green, theme.colors.red]);

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
      <Icon
        onClick={onCloseClick}
        size={iconSize}
        imgSrc={getImage('/images/close.svg')}
      />
      <Canvas
        ref={canvasRef}
        width={imageDimensions.width}
        height={imageDimensions.height}
        $borderRadius={borderRadius}
      />
      {isResponseReceived && <DownloadBtn canvasRef={canvasRef} />}
      {isUploading && (
        <Progressbar value={uploadProgress} borderRadius={borderRadius} />
      )}
      {isAnalyzing && <Scanner />}
    </CanvasContainer>
  );
};

ImagePreview.propTypes = {
  className: PropTypes.string,
  borderRadius: PropTypes.number
};

ImagePreview.defaultProps = {
  className: '',
  borderRadius: 0
};

export default ImagePreview;
