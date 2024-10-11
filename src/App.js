import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { WhiteboardProvider } from './context/WhiteboardContext';
import AppRouter from './routes/AppRouter';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const onSidebarToggle = () => {
    setIsSidebarOpen(true);
  }

  const onCloseSidebar = () => {
    setIsSidebarOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <WhiteboardProvider>
          <Header onSidebarToggle={onSidebarToggle} />
          <Sidebar open={isSidebarOpen} onClose={onCloseSidebar} />
          <AppRouter />
          <Footer/>
        </WhiteboardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
