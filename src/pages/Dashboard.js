import React, { useContext } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { WhiteboardContext } from '../context/WhiteboardContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { whiteboards, createWhiteboard } = useContext(WhiteboardContext);
  const navigate = useNavigate();

  const handleCreateWhiteboard = async () => {
    const newWhiteboardId = await createWhiteboard('Untitled Whiteboard');
    navigate(`/whiteboard/${newWhiteboardId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Whiteboards
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateWhiteboard}>
        Create New Whiteboard
      </Button>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {whiteboards.map((whiteboard) => (
          <Grid item xs={12} sm={6} md={4} key={whiteboard.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{whiteboard.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(whiteboard.createdAt).toLocaleString()}
                </Typography>
                <Button onClick={() => navigate(`/whiteboard/${whiteboard.id}`)}>
                  Open
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;