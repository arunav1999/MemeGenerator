import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Captions} from '../captions/Captions'


export const Meme = () => {

  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [currentOptions,changeOptions] = useState(0);
  const history = useHistory();

  const create = () =>
  {
    history.push(`/create?id=${memes[memeIndex].id}&boxcount=${memes[memeIndex].box_count}`);
  }

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(res => {
      res.json().then(res => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);

  useEffect(() => {
    if(memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);

  return(
    memes.length ? 
    <div className="main">
      <div className="scrn1btns">
        
        <div className="createBtn">
        <div><h1 className="title">Meme Creator</h1></div>
          <button  onClick={create} className="btn btn-secondary btns">Create your own meme</button>
        <div className="helpText">Click on a meme template to choose and press the button above</div>
        
        </div>
      </div>
      
      <div className="home_page_img_gal">
      
         <div className="j">
            <div className="Imgrow1">
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[0].url}  onClick={() =>setMemeIndex(0)} /></div>
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[1].url} onClick={() =>setMemeIndex(1)}  /></div>
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[2].url} onClick={() =>setMemeIndex(2)} /></div>
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[3].url} onClick={() =>setMemeIndex(3)} /></div>
            </div>
            <div className="Imgrow2">
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[4].url} onClick={() =>setMemeIndex(4)} /></div>
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[5].url} onClick={() =>setMemeIndex(5)} /></div>
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[6].url} onClick={() =>setMemeIndex(6)} /></div>
                <div className="picsize"><img className="im" alt='meme' height="200" width="200" src={memes[7].url} onClick={() =>setMemeIndex(7)} /></div>
            </div>
         </div>
      </div>
      
    </div> :
    <></>
  );
};