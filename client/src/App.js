import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import Navbar from 'scenes/navbar';

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <Navbar />
          <CssBaseline />
          <Routes>
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<LoginPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
