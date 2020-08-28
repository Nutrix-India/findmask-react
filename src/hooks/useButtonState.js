import { useState } from 'react';

const useButtonState = (onClick) => {
  const [opacity, setOpacity] = useState(1);
  const onBtnClick = () => {
    setOpacity(0.85);
    setTimeout(() => {
      setOpacity(1);
    }, 1000);
    onClick();
  };
  return { opacity, onBtnClick };
};

export default useButtonState;
