import React, { useState, useRef, useEffect, useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import { WhiteboardContext } from '../../context/WhiteboardContext';
import InfiniteCanvas from './InfiniteCanvas';
import ShapeRecognition from './ShapeRecognition';
import Line from '../elements/Line';
import Rectangle from '../elements/Rectangle';
import Circle from '../elements/Circle';
import TextAnnotation from '../Tools/TextAnnotation';

const Canvas = () => {
  const stageRef = useRef(null);
  const { currentWhiteboard, updateWhiteboardElement } = useContext(WhiteboardContext);
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (currentWhiteboard && currentWhiteboard.elements) {
      setElements(currentWhiteboard.elements);
    }
  }, [currentWhiteboard]);

  const handleElementUpdate = (elementId, newData) => {
    updateWhiteboardElement(currentWhiteboard.id, elementId, newData);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  const renderElement = (element) => {
    const isSelected = element.id === selectedId;
    const props = {
      key: element.id,
      element: element,
      isSelected,
      onSelect: handleSelect,
      onChange: handleElementUpdate,
    };

    switch (element.type) {
      case 'line':
        return <Line {...props} />;
      case 'rectangle':
        return <Rectangle {...props} />;
      case 'circle':
        return <Circle {...props} />;
      case 'text':
        return <TextAnnotation {...props} />;
      default:
        return <Rectangle {...props} />;
    }
  };

  return (
    <InfiniteCanvas>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleDeselect}
        onTap={handleDeselect}
      >
        <Layer>
          {elements.map(renderElement)}
          <ShapeRecognition onShapeRecognized={handleElementUpdate} />
        </Layer>
      </Stage>
    </InfiniteCanvas>
  );
};

export default Canvas;