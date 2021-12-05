import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import '../App.css';
import NewsContext from '../context/NewsContext';

export default function Login({ login, authenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { state: { alanInstance }, dispatch } = useContext(NewsContext);

  useEffect(() => {
    if (authenticated) {
      navigate('/home');
    }
  }, [authenticated]);

  useEffect(() => {
    if (alanInstance) {
      alanInstance.remove();
    }
    dispatch({
      type: 'SET_ALAN_INSTANCE',
      payload: {
        alanInstance: null,
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      login(result.user);
      window.M.toast({ html: `Welcome ${result.user.email}`, classes: 'green' });
      navigate('/home');
    } catch (err) {
      window.M.toast({ html: err.message, classes: 'red' });
    }
  };
  return (
    <div className="login-body">
      <div className="center container " style={{ maxWidth: '500px' }}>
        <div><h3 className="login-text-center">Please Login!!</h3></div>
        <div className="progress light-blue accent-3" />

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn light-blue accent-3">login</button>
        </form>
      </div>
    </div>
  );
}
