import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Brush, Gesture, ShapeLine, TextFields } from '@mui/icons-material';

const DrawingTools = ({ activeTool, onToolChange }) => {
  const handleToolChange = (event, newTool) => {
    if (newTool !== null) {
      onToolChange(newTool);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={activeTool}
        exclusive
        onChange={handleToolChange}
        aria-label="drawing tools"
      >
        <ToggleButton value="brush" aria-label="brush">
          <Brush />
        </ToggleButton>
        <ToggleButton value="shape" aria-label="shape">
          <ShapeLine />
        </ToggleButton>
        <ToggleButton value="text" aria-label="text">
          <TextFields />
        </ToggleButton>
        <ToggleButton value="eraser" aria-label="eraser">
          <Gesture />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DrawingTools;