import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, ButtonGroup } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';

import logo from './images/classic-logo.png';

import cover from './images/cover.png';
import background from './images/new.jpg';
import { NewsCards, Modal } from './components';
import useStyles from './styles';
import NewsContext from './context/NewsContext';
// import Login from './pages/Login';

const App = ({ logout }) => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { state: { alanInstance }, dispatch } = useContext(NewsContext);
  const navigate = useNavigate();

  const classes = useStyles();

  useEffect(() => {
    if (!alanInstance) {
      const instance = alanBtn({
        key: '9220133bfc722ca2aeaf38f9157848402e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'instructions') {
            setIsOpen(true);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        },
      });
      dispatch({
        type: 'SET_ALAN_INSTANCE',
        payload: {
          alanInstance: instance,
        },
      });
    }
  }, [alanInstance]);

  const buttongroup = (
    <ButtonGroup variant="text" aria-label="text button group">
      <Button style={{ color: 'white' }} className={classes.buttonheader} onClick={() => navigate('/')}>Home Page</Button>
      {/* <Button style={{ color: 'white' }} className={classes.buttonheader}>About Us</Button> */}
      <Button style={{ color: 'white' }} className={classes.buttonheader} onClick={logout}>Log Out</Button>
    </ButtonGroup>
  );
  const displayDesktop = () => {
    const websitelogo = (
      <Typography variant="h6" component="h1">
        AI Powered News Website
      </Typography>
    );
    return <Toolbar className={classes.buttonheadergroup}>{websitelogo} {buttongroup}</Toolbar>;
  };
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        {/* <img src="#" className={classes.alanLogo} alt="logo" /> */}
        <div style={{ height: '151%',
          width: '100%',
          position: 'absolute',
          zIndex: -1,
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed' }}
        />
        <header><AppBar className={classes.header}>{displayDesktop()}</AppBar>
        </header>
        <div className={classes.coverContainer}>
          <img src={cover} className={classes.coverphoto} alt="cover" />
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        {!newsArticles.length ? (
          <div className={classes.footer}>
            <Typography variant="body1" component="h2">
              Created by Group 6 -  MVK
            </Typography>
            <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
