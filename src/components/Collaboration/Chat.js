import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { WhiteboardContext } from '../../context/WhiteboardContext';
import { AuthContext } from '../../context/AuthContext';
import { subscribeToCollection, createDocument } from '../../firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentWhiteboard } = useContext(WhiteboardContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (currentWhiteboard) {
      const unsubscribe = subscribeToCollection(`whiteboards/${currentWhiteboard.id}/messages`, (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(updatedMessages);
      });

      return () => unsubscribe();
    }
  }, [currentWhiteboard]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && currentWhiteboard) {
      await createDocument(`whiteboards/${currentWhiteboard.id}/messages`, {
        text: newMessage,
        userId: user.uid,
        userName: user.displayName,
        timestamp: new Date().toISOString(),
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText primary={message.userName} secondary={message.text} />
          </ListItem>
        ))}
      </List>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
};

export default Chat;