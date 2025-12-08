import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function ConfettiEffect() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // 5초 후 꽃가루 효과 중지
    const timer = setTimeout(() => setRecycle(false), 5000);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={recycle}
      numberOfPieces={200}
      colors={['#ff9ecd', '#ffc0cb', '#ffb6c1', '#ff69b4', '#fff0f5']}
    />
  );
}
