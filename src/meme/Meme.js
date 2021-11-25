import React, { useEffect, useState } from 'react';
//import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
import {Captions} from '../captions/Captions'


export const Meme = () => {

  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [currentOptions,changeOptions] = useState(0);
  const history = useHistory();

  const updateCaption = (e, index) => {
    const text = e.target.value || '';
    setCaptions(
      captions.map((c, i) => {
        if(index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();
    //setHeaderMessage("Here's the meme you generated:")
    formData.append('username', 'ardey7');
    formData.append('password', 'Ardey71999');
    formData.append('template_id', currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        history.push(`/generated?url=${res.data.url}`);
      });
    });
  };

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
  const changeColor = () =>
  {
    var hold = document.getElementsByClassName("picsize");
    hold[memeIndex].style.borderColor="red";
  }

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
    <div >
      <button onClick={generateMeme} className="btn btn-success btns">Generate</button>
      <button  onClick={create} className="btn btn-danger btns">Create your own meme</button>
      <button onClick={() => setMemeIndex(memeIndex + 1)} className="btn btn-info" >Skip</button>
      <div className="input_container">
            <div className="form-group">
            {
                captions.map((c, index) => (
                <input onChange={(e) => updateCaption(e, index)} key={index} className="form-control inps" placeholder="Enter meme text" />
                ))
            }
            </div>
      </div>
      <div className="home_page_img_gal">
         <div className="Imgrow1">
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[0].url}  onClick={() =>setMemeIndex(0)} />{memes[0].id}</div>
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[1].url} onClick={() =>setMemeIndex(1)}  />{memes[1].id}</div>
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[2].url} onClick={() =>setMemeIndex(2)} />{memes[2].id}</div>
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[3].url} onClick={() =>setMemeIndex(3)} />{memes[3].id}</div>
         </div>
         <div className="Imgrow2">
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[4].url} onClick={() =>setMemeIndex(4)} />{memes[4].id}</div>
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[5].url} onClick={() =>setMemeIndex(5)} />{memes[5].id}</div>
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[6].url} onClick={() =>setMemeIndex(6)} />{memes[6].id}</div>
            <div className="picsize"><img alt='meme' height="300" width="300" src={memes[7].url} onClick={() =>setMemeIndex(7)} />{memes[7].id}</div>
         </div>
        
      </div>
      <button className="btn btn-primary" >Shuffle</button>
    </div> :
    <></>
  );
};