import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Brush, PanTool, Create, Crop169 } from '@mui/icons-material';

const DrawingTools = ({ activeTool, onToolChange }) => {
  return (
    <ToggleButtonGroup
      value={activeTool}
      exclusive
      onChange={(event, newTool) => {
        if (newTool !== null) {
          onToolChange(newTool);
        }
      }}
    >
      <ToggleButton value="brush" aria-label="brush">
        <Brush />
      </ToggleButton>
      <ToggleButton value="pan" aria-label="pan">
        <PanTool />
      </ToggleButton>
      <ToggleButton value="text" aria-label="text">
        <Create />
      </ToggleButton>
      <ToggleButton value="shape" aria-label="shape">
        <Crop169 />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DrawingTools;