import React from 'react';
import { Circle as KonvaCircle, Transformer } from 'react-konva';

const Circle = ({ element, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaCircle
        onClick={() => onSelect(element.id)}
        onTap={() => onSelect(element.id)}
        ref={shapeRef}
        {...element}
        draggable
        onDragEnd={(e) => {
          onChange(element.id, {
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(element.id, {
            x: node.x(),
            y: node.y(),
            radius: Math.max(5, node.width() * scaleX / 2),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Circle;