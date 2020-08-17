import { useContext, useState, useEffect } from 'react';
import { Context as MobileContext } from '@contexts/MobileContext';
import { desktopCanvasSize } from '@constants/index';

const useCanvasDimensions = () => {
  const isMobile = useContext(MobileContext);
  const [dimensions, setDimensions] = useState({
    width: desktopCanvasSize,
    height: desktopCanvasSize
  });
  useEffect(() => {
    if (isMobile && window) {
      const size = Math.round(window.innerWidth * 0.85);
      setDimensions({
        width: size,
        height: size
      });
    }
  }, [isMobile]);
  return dimensions;
};

export default useCanvasDimensions;
