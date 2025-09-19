import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { store } from './store';
import theme from './theme';
import Layout from './components/layout/Layout';
import {
  HomePage,
  NotFoundPage,
  AtomsDemo,
  MoleculesDemo,
  OrganismsDemo,
  TemplatesDemo,
  ReduxDemoPage,
} from './pages';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demos/atoms" element={<AtomsDemo />} />
              <Route path="/demos/molecules" element={<MoleculesDemo />} />
              <Route path="/demos/organisms" element={<OrganismsDemo />} />
              <Route path="/demos/templates" element={<TemplatesDemo />} />
              <Route path="/demos/redux" element={<ReduxDemoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
