import React, { useEffect, useState, useContext } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { WhiteboardContext } from '../../context/WhiteboardContext';
import { subscribeToCollection } from '../../firebase/firestore';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { currentWhiteboard } = useContext(WhiteboardContext);

  useEffect(() => {
    if (currentWhiteboard) {
      const unsubscribe = subscribeToCollection('users', (snapshot) => {
        const updatedUsers = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => currentWhiteboard.users.includes(user.id));
        setUsers(updatedUsers);
      });

      return () => unsubscribe();
    }
  }, [currentWhiteboard]);

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar src={user.photoURL} alt={user.displayName} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;