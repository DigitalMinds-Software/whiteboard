import React, { useState, useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';

const TextAnnotation = ({ element, isSelected, onSelect, onChange }) => {
  const [editing, setEditing] = useState(false);
  const textRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTextDblClick = () => {
    setEditing(true);
  };

  const handleTextChange = (e) => {
    onChange(element.id, {
      text: e.target.value,
    });
  };

  const handleBlur = () => {
    setEditing(false);
    onSelect(null);
  };

  return (
    <>
      <Text
        ref={textRef}
        {...element}
        onDblClick={handleTextDblClick}
        onClick={() => onSelect(element.id)}
        onTap={() => onSelect(element.id)}
        draggable
        onDragEnd={(e) => {
          onChange(element.id, {
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {editing && (
        <textarea
          value={element.text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          style={{
            position: 'absolute',
            top: element.y + 'px',
            left: element.x + 'px',
            width: '200px',
            height: '100px',
            fontSize: element.fontSize + 'px',
            fontFamily: element.fontFamily,
            color: element.fill,
            border: 'none',
            padding: '0px',
            margin: '0px',
            overflow: 'hidden',
            background: 'none',
            outline: 'none',
            resize: 'none',
            lineHeight: 'normal',
            textAlign: 'left',
            transformOrigin: 'left top',
          }}
        />
      )}
      {isSelected && !editing && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextAnnotation;