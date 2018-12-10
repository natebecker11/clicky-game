import React, { Component } from 'react';
import MainNav from './components/MainNav'
import ClickPic from './components/ClickPic'
import { Jumbotron, Button } from 'reactstrap';
import chars from './assets/chars.json'

import './App.css';

class App extends Component {
  
  state = {
    score: 0,
    topScore: 0,
    charPics: JSON.parse(JSON.stringify(chars)),
    marqueeText: "Click an image to begin! Don't click the same one twice!"
  }

  incScore = () => {
    this.setState({
      score: this.state.score + 1
    })
    if (this.state.topScore <= this.state.score) {
      this.setState({
        topScore: this.state.score + 1
      })
    }
  }

  resetScore = () => {
    this.setState({
      score: 0
    })
  }

  resetAllScores = () => {
    this.setState({
      score: 0,
      topScore: 0
    })
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    // return array
  }

  setShuffledArray = (event) => {
    let arrayCopy = this.state.charPics.slice(0)
    let clickedCharIndex = arrayCopy.findIndex(char => char.src === event.target.dataset.name)
    
    if (arrayCopy[clickedCharIndex].clicked) {
      return this.setState({
        score: 0,
        marqueeText: 'You guessed incorrectly!',
        charPics: JSON.parse(JSON.stringify(chars))
      })
    }
    // console.log(clickedCharIndex)
    // let arrayCopy = this.shuffleArray(this.state.charPics.slice(0))
    arrayCopy[clickedCharIndex].clicked = true
    this.shuffleArray(arrayCopy)
    this.incScore()
    this.setState({
      charPics: arrayCopy,
      marqueeText: 'You guessed correctly!'

    })
  }

  render() {
    return (
      <div className="App">
        <MainNav>{
          {
            score: this.state.score,
            topScore: this.state.topScore,
          }
        }</MainNav>
        <div>
          <Jumbotron>
            <h1 className="display-3">A Game Of Clicks</h1>
            <p className="lead">In The Game Of Clicks, You Either Click... Or You Don't.</p>
            <p className="lead">{
              this.state.marqueeText
            }</p>
          </Jumbotron>
        </div>
        <div className="container">
          <div className="row">
            {this.state.charPics.map(char => <ClickPic onClick={this.setShuffledArray} key={char.src}>{char}</ClickPic>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
