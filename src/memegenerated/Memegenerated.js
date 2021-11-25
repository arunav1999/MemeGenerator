import React, { useState } from 'react';
//import styles from './styles.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';

export const MemeGenerated = () => {

  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return(
    <div className="generatedMemeContainer">
      <div className="generatedMemeImage">
            { url && <img alt='meme' width="500" height="500" src={url} /> }
      </div>
      <div className="generateMoreButtonContainer">
        <button onClick={() => history.push('/')} className="btn btn-success" >
            Make More Memes
        </button>
        <button onClick={copyLink} className="btn btn-info">
            {copied ? 'Link copied!' : 'Copy link'} 
        </button>
      </div>
      
    </div>
  );
};