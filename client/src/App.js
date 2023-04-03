import { Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import AuthPage from 'scenes/authPage';
import ProfilePage from 'scenes/profilePage';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import Navbar from 'scenes/navbar';
import DetailsPage from 'scenes/detailsPage';
import EditPage from 'scenes/editPage';
import Notification from 'components/Notification';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Notification />
          <Box p="5rem 6%" pb="2rem">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} /> */}
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route
                path="/profile/:userId/friends"
                element={<ProfilePage />}
              />
              <Route path="/posts/:postId" element={<DetailsPage />} />
              <Route path="/posts/:postId/edit" element={<EditPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
