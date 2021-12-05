import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewsReducer from './reducer/NewsReducer';
import NewsContext from './context/NewsContext';

import './index.css';

import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './pages/NavBar';
import Welcome from './pages/Welcome';
import { auth } from './utils/firebase';

const Root = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(NewsReducer, { alanInstance: null });

  const logout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      setUser(null);
    }).catch((error) => {
      window.M.toast({ html: error.message, classes: 'red' });
    });
  };

  const login = (u) => {
    setLoading(false);
    if (!u) {
      logout();
    } else {
      setLoggedIn(true);
      setUser(u);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        login(u);
      } else {
        setLoading(false);
        logout();
      }
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NewsContext.Provider value={{ dispatch, state }}>
        <NavBar user={user} logoutUser={setUser} />
        <Routes>
          <Route exact path="/home" element={<ProtectedRoute authenticated={loggedIn} />}>
            <Route exact path="/home" element={<App logout={logout} user={user} />} />
          </Route>
          <Route path="/" element={<Welcome authenticated={loggedIn} />} />
          <Route path="/login" element={<Login login={login} authenticated={loggedIn} />} />
          <Route exact path="/signup" element={<Signup authenticated={loggedIn} />} />
        </Routes>
      </NewsContext.Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
