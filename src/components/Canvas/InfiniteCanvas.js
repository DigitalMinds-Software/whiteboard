import React, { useState, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const InfiniteCanvas = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleTransform = useCallback((_, state) => {
    setPosition({ x: state.positionX, y: state.positionY });
    setScale(state.scale);
  }, []);

  return (
    <TransformWrapper
      onTransformed={handleTransform}
      minScale={0.1}
      maxScale={5}
      limitToBounds={false}
    >
      <TransformComponent>
        <div style={{ width: '5000px', height: '5000px' }}>
          {React.cloneElement(children, { scale, position })}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default InfiniteCanvas;