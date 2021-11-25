import { render } from '@testing-library/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';


export const Captions = (props) =>
{
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [inputs, setInputs] = useState([]);
  const history = useHistory();


  const updateCaption = (e, index) => {
    const text = e.target.value || '';
    const cloneCaptions = [...captions]
    //Spread and rest operator in JavaScript
    //Shallow cloning and deep cloning
    cloneCaptions[index] = text
    console.log(cloneCaptions);
    console.log(captions)
    setCaptions(
        cloneCaptions
    )
  };




    const generateMeme = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        const boxcount = queryParams.get('boxcount');

        const formData = new FormData();
  
        formData.append('username', 'ardey7');
        formData.append('password', 'Ardey71999');
        formData.append('template_id', id);
        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
        
        fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        body: formData
        }).then(res => {
        res.json().then(res => {
            console.log('REs'+ res.data)
            history.push(`/generated?url=${res.data.url}`);
        });
        });
  };
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };



  useEffect(() => {
    
      const queryParams = new URLSearchParams(window.location.search);
      const bxc = queryParams.get('boxcount');
      var buffer = []
      setCaptions(new Array(parseInt(bxc)).fill(''));
    
  }, []);

    render()
    {
        
        return(
            <div className="input_container">
              <div><h1 className="t2">Enter the following details to create your meme:</h1></div>
              <div className="form-group">
              {
                  captions.map((c, index) => (
                    
                      <input onChange={(e) => updateCaption(e, index)} key={index} className="form-control inps" placeholder="Enter meme text" />
                    
                      ))
              }
            </div>
            <button onClick={generateMeme} className="btn btn-success btns">Generate</button>
           
        </div>
        
        );
    }
}
