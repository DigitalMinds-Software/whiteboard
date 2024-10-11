import React, { useState, useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';

const TextAnnotation = ({ isSelected, onSelect, onChange, ...textProps }) => {
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
    onChange({
      ...textProps,
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
        {...textProps}
        onDblClick={handleTextDblClick}
        onClick={() => onSelect(textProps.id)}
        onTap={() => onSelect(textProps.id)}
        draggable
      />
      {editing && (
        <textarea
          value={textProps.text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          style={{
            position: 'absolute',
            top: textProps.y + 'px',
            left: textProps.x + 'px',
            width: '200px',
            height: '100px',
            fontSize: textProps.fontSize + 'px',
            fontFamily: textProps.fontFamily,
            color: textProps.fill,
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