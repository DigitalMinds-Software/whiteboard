import React, { useRef, useEffect, useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { WhiteboardContext } from '../../context/WhiteboardContext';
import InfiniteCanvas from './InfiniteCanvas';
import ShapeRecognition from './ShapeRecognition';

const Canvas = () => {
  const stageRef = useRef(null);
  const { currentWhiteboard, updateWhiteboardElement } = useContext(WhiteboardContext);

  useEffect(() => {
    if (currentWhiteboard) {
      // Load elements from currentWhiteboard.elements
    }
  }, [currentWhiteboard]);

  const handleElementUpdate = (elementId, newData) => {
    updateWhiteboardElement(currentWhiteboard.id, elementId, newData);
  };

  return (
    <InfiniteCanvas>
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* Render whiteboard elements here */}
          <ShapeRecognition onShapeRecognized={handleElementUpdate} />
        </Layer>
      </Stage>
    </InfiniteCanvas>
  );
};

export default Canvas;