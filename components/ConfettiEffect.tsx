import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface ConfettiEffectProps {
  type?: 'hearts' | 'flowers' | 'sparkles' | 'mixed';
}

export default function ConfettiEffect({ type = 'mixed' }: ConfettiEffectProps) {
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

    // 7초 후 꽃가루 효과 중지
    const timer = setTimeout(() => setRecycle(false), 7000);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, []);

  // 타입별 색상 설정
  const getColors = () => {
    switch (type) {
      case 'hearts':
        return ['#ff1744', '#ff4569', '#ff6b8a', '#ff8fab', '#ffb3cc', '#ffc1d6'];
      case 'flowers':
        return ['#ffc0cb', '#ffb3d9', '#ffd1e3', '#ffe4f3', '#fff5f8', '#ffebf5'];
      case 'sparkles':
        return ['#ffd700', '#ffed4e', '#fff59d', '#ffe57f', '#ffc107', '#ffe082'];
      case 'mixed':
      default:
        return ['#ff9ecd', '#ffc0cb', '#ffd700', '#ffe4f3', '#ff6b9d', '#ffed4e', '#fff', '#ffb3d9'];
    }
  };

  // 타입별 입자 수 조정
  const getPiecesCount = () => {
    switch (type) {
      case 'sparkles':
        return 150;
      case 'hearts':
        return 100;
      default:
        return 200;
    }
  };

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={recycle}
      numberOfPieces={getPiecesCount()}
      colors={getColors()}
      gravity={0.08}
      wind={0.005}
      opacity={0.7}
      style={{ zIndex: 9999 }}
      drawShape={(ctx) => {
        ctx.beginPath();
        if (type === 'hearts') {
          ctx.moveTo(0, 2);
          ctx.bezierCurveTo(-2, 0, -3, 0, -3, 2);
          ctx.bezierCurveTo(-3, 3, -2, 4, 0, 5);
          ctx.bezierCurveTo(2, 4, 3, 3, 3, 2);
          ctx.bezierCurveTo(3, 0, 2, 0, 0, 2);
        } else if (type === 'sparkles') {
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const radius = i % 2 === 0 ? 3 : 1.5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        } else {
          ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fill();
      }}
    />
  );
}
