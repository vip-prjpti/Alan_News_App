import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import NewsContext from '../context/NewsContext';

function Welcome() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  const { state: { alanInstance }, dispatch } = useContext(NewsContext);

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

  return (
    <div className="bg_image" style={{ position: 'absolute' }}>
      <div className="center">
        <div className="text-center">
          <h1>NEWS THAT MATTER</h1>
          <span className="tera montserrat ls-xlarge bold"><h3>TO YOU</h3></span>
          <h3>Now with Voice Assistant</h3>
          <button className="findbtn" onClick={goToLogin}>Get Your News</button>

        </div>
      </div>

    </div>

  );
}

export default Welcome;
