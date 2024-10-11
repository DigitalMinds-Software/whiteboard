import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Box, Paper, Divider } from '@mui/material';
import Canvas from '../components/Canvas/Canvas';
import DrawingTools from '../components/Tools/DrawingTools';
import Chat from '../components/Collaboration/Chat';
import UserList from '../components/Collaboration/UserList';
import { WhiteboardContext } from '../context/WhiteboardContext';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { subscribeToCollection, updateDocument } from '../firebase/firestore';

const Whiteboard = () => {
    const [activeTool, setActiveTool] = useState('brush');
    const { id } = useParams();
    const { setCurrentWhiteboard, whiteboards, addElement, updateElement, deleteElement } = useContext(WhiteboardContext);
    const { user } = useContext(AuthContext);
    const [elements, setElements] = useState([]);
  
    useEffect(() => {
      const currentWhiteboard = whiteboards.find(wb => wb.id === id);
      if (currentWhiteboard) {
        setCurrentWhiteboard(currentWhiteboard);
        setElements(currentWhiteboard.elements || []);
      }
    }, [id, whiteboards, setCurrentWhiteboard]);
  
    useEffect(() => {
      if (id) {
        const unsubscribe = subscribeToCollection(`whiteboards/${id}/elements`, (snapshot) => {
          const updatedElements = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setElements(updatedElements);
        });
  
        return () => unsubscribe();
      }
    }, [id]);
  
    const handleElementUpdate = useCallback((elementId, newData) => {
      updateElement(id, elementId, newData);
    }, [id, updateElement]);
  
    const handleAddElement = useCallback((newElement) => {
      const elementToAdd = {
        ...newElement,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      };
      addElement(id, elementToAdd);
    }, [id, user.uid, addElement]);
  
    const handleDeleteElement = useCallback((elementId) => {
      deleteElement(id, elementId);
    }, [id, deleteElement]);
  
    return (
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <Canvas 
            activeTool={activeTool} 
            elements={elements}
            onElementUpdate={handleElementUpdate}
            onAddElement={handleAddElement}
            onDeleteElement={handleDeleteElement}
          />
          <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
            <DrawingTools activeTool={activeTool} onToolChange={setActiveTool} />
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Paper sx={{ width: 300, display: 'flex', flexDirection: 'column' }}>
          <UserList />
          <Divider />
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <Chat />
          </Box>
        </Paper>
      </Box>
    );
  };
  
  export default Whiteboard;