import React from 'react';
import { Meme } from '../meme/Meme';
import { Switch, Route } from 'react-router-dom';
import { MemeGenerated } from '../memegenerated/Memegenerated';
import {Header} from '../header/Header'
import {Captions} from '../captions/Captions'
// import styles from './styles.module.css';

export const App = () => {
  return (
    <div>
    
      <Switch>
        <Route exact path='/'>
          <Meme />
        </Route>
        <Route path='/generated'>
          <MemeGenerated />
        </Route>
        <Route path='/create/'>
          <Captions />
        </Route>
      </Switch>
    </div>
  );
}