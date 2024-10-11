import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Create, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
        { text: 'New Whiteboard', icon: <Create />, path: '/whiteboard/new' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;