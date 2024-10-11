import React, { useRef, useState } from 'react';
import { Line } from 'react-konva';

const ShapeRecognition = ({ onShapeRecognized }) => {
  const [points, setPoints] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setPoints([pos.x, pos.y]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setPoints((prevPoints) => [...prevPoints, point.x, point.y]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    const recognizedShape = recognizeShape(points);
    if (recognizedShape) {
      onShapeRecognized(recognizedShape);
    }
    setPoints([]);
  };

  const recognizeShape = (points) => {
    if (points.length < 6) return null; // Not enough points to recognize a shape
  
    const [startX, startY] = [points[0], points[1]];
    const [endX, endY] = [points[points.length - 2], points[points.length - 1]];
    
    // Calculate bounding box
    const minX = Math.min(...points.filter((_, i) => i % 2 === 0));
    const maxX = Math.max(...points.filter((_, i) => i % 2 === 0));
    const minY = Math.min(...points.filter((_, i) => i % 2 === 1));
    const maxY = Math.max(...points.filter((_, i) => i % 2 === 1));
    
    const width = maxX - minX;
    const height = maxY - minY;
    const aspectRatio = width / height;
    
    // Calculate the total path length
    let totalLength = 0;
    for (let i = 2; i < points.length; i += 2) {
      const dx = points[i] - points[i - 2];
      const dy = points[i + 1] - points[i - 1];
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
    
    // Check if the shape is closed
    const distanceToStart = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    const isClosed = distanceToStart < totalLength * 0.1;
    
    if (isClosed) {
      // Circle detection
      const estimatedRadius = (width + height) / 4;
      const estimatedCircumference = 2 * Math.PI * estimatedRadius;
      if (Math.abs(totalLength - estimatedCircumference) < estimatedCircumference * 0.2) {
        return {
          type: 'circle',
          center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
          radius: estimatedRadius
        };
      }
      
      // Rectangle detection
      if (aspectRatio > 0.7 && aspectRatio < 1.3) {
        return {
          type: 'rectangle',
          topLeft: { x: minX, y: minY },
          width,
          height
        };
      }
      
      // Triangle detection
      const isTriangle = points.length <= 8; // Simplified check for triangle
      if (isTriangle) {
        return {
          type: 'triangle',
          points: [
            { x: points[0], y: points[1] },
            { x: points[2], y: points[3] },
            { x: points[4], y: points[5] }
          ]
        };
      }
    }
    
    return null; // Shape not recognized
  };

  return (
    <Line
      points={points}
      stroke="#df4b26"
      strokeWidth={5}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default ShapeRecognition;