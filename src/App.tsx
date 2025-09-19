import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  ThemeProvider,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { store } from './store';
import theme from './theme';
import ComponentDemo from './components/ComponentDemo';
import MoleculeDemo from './components/MoleculeDemo';
import OrganismDemo from './components/OrganismDemo';
import TemplateDemo from './components/TemplateDemo';
import ReduxDemo from './components/ReduxDemo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Vehicle Frontend - Component Library
            </Typography>
          </Toolbar>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ backgroundColor: 'primary.dark' }}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Atoms" />
            <Tab label="Molecules" />
            <Tab label="Organisms" />
            <Tab label="Templates" />
            <Tab label="Redux Demo" />
          </Tabs>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <ComponentDemo />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <MoleculeDemo />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <OrganismDemo />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <TemplateDemo />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <ReduxDemo />
        </TabPanel>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
