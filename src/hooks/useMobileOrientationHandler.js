import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Context as MobileContext } from '@contexts/MobileContext';
import { setShowOrientationMsg } from '@actions/index';

const useMobileOrientationHandler = () => {
  const dispatch = useDispatch();
  const isMobile = useContext(MobileContext);
  useEffect(() => {
    if (isMobile) {
      const onOrientationChange = () => {
        dispatch(
          setShowOrientationMsg(
            [90, -90].includes(
              window.orientation ?? window.screen.orientation.angle
            )
          )
        );
      };
      window.addEventListener('orientationchange', onOrientationChange);
      return () => {
        window.removeEventListener('orientationchange', onOrientationChange);
      };
    }
  }, [dispatch, isMobile]);

  useEffect(() => {
    if (isMobile) {
      dispatch(
        setShowOrientationMsg(
          [90, -90].includes(
            window.orientation ?? window.screen.orientation.angle
          )
        )
      );
    }
  }, [dispatch, isMobile]);
};

export default useMobileOrientationHandler;
