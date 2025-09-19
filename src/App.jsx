import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import theme from './theme';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle Frontend
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Vite + React + MUI
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
              my={3}
            >
              <Button
                variant="contained"
                startIcon={<Remove />}
                onClick={() => setCount((count) => count - 1)}
              >
                Decrease
              </Button>
              <Typography variant="h5" component="span">
                Count: {count}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setCount((count) => count + 1)}
              >
                Increase
              </Button>
            </Box>
            <Typography variant="body1" align="center" color="text.secondary">
              Edit <code>src/App.jsx</code> and save to test HMR
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
