import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { imageInputModes } from '@constants/index';
import { resetData, setImageInputMode } from '@actions/index';
import { apiTypes } from '@actionTypes/index';
import { getImage } from '@utils/imageHelper';
import useCanvasDimensions from '@hooks/useCanvasDimensions';
import resizeAndStore from '@utils/resizeAndStore';
import RoundedIcon from '@base/RoundedIcon';

const Wrapper = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}px;
  background-color: ${({ theme }) => theme.colors.paleGreen};
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
`;

const iconSize = 28;

const Icon = styled(RoundedIcon)`
  position: absolute;
  right: -${iconSize / 2}px;
  top: -${iconSize / 2}px;
`;

const cameraIconSize = 50;

const CameraIcon = styled(RoundedIcon)`
  position: absolute;
  bottom: -${cameraIconSize / 2}px;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.paleGreen};
`;

const VideoStream = styled.video`
  width: 100%;
`;

const WebCam = () => {
  const videoRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    let stream = null;
    if (!navigator.mediaDevices) {
      // eslint-disable-next-line no-console
      console.log('mediaDevices not supported.');
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((_stream) => {
        const video = videoRef.current;
        stream = _stream;
        if (video) {
          if ('srcObject' in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
        } else {
          // already unmounted
          _stream.getVideoTracks().forEach((track) => track.stop());
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`${err.name}: ${err.message}`);
      });
    return () => {
      if (stream) {
        stream.getVideoTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const canvasDimensions = useCanvasDimensions();

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext('2d')
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.toBlob(
      (blob) => {
        resizeAndStore({
          file: blob,
          dispatch,
          width: canvasDimensions.width,
          height: canvasDimensions.height
        });
        // try {
        //   const reader = new FileReader();
        //   reader.onloadend = () => {
        //     dispatch(
        //       setImage({
        //         uri: blob,
        //         name: `${window.btoa(Date.now())}.png`,
        //         previewUrl: reader.result
        //       })
        //     );
        //   }
        //   reader.readAsDataURL(blob);
        // } catch (err) {
        //   console.err(err);
        // }
      },
      'image/png',
      1
    );
  };

  const onClose = () => {
    dispatch(resetData());
    dispatch({ type: `${apiTypes.SEND_FOR_ANALYSIS}_RESET_API_CALL` });
    dispatch({ type: `${apiTypes.SEND_FEEDBACK}_RESET_API_CALL` });
    dispatch(setImageInputMode(imageInputModes.chooseFile));
  };

  return (
    <Wrapper $width={canvasDimensions.width}>
      <Icon
        onClick={onClose}
        size={iconSize}
        imgSrc={getImage('/images/close.svg')}
      />
      <VideoStream ref={videoRef} autoPlay playsInline />
      <CameraIcon
        onClick={captureImage}
        size={cameraIconSize}
        imgSrc={getImage('/images/camera.svg')}
      />
    </Wrapper>
  );
};

export default WebCam;
