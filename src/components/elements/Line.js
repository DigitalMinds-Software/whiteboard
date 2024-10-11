import React from 'react';
import { Line as KonvaLine } from 'react-konva';

const Line = ({ element, isSelected, onSelect, onChange }) => {
  return (
    <KonvaLine
      points={element.points}
      stroke={element.color}
      strokeWidth={element.strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      draggable
      onClick={() => onSelect(element.id)}
      onTap={() => onSelect(element.id)}
      onDragEnd={(e) => {
        onChange(element.id, {
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    />
  );
};

export default Line;