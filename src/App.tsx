import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import theme from './theme';
import ComponentDemo from './components/ComponentDemo';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle Frontend - Component Library
          </Typography>
        </Toolbar>
      </AppBar>
      <ComponentDemo />
    </ThemeProvider>
  );
};

export default App;
