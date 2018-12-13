import React, { Component } from 'react';
import MainNav from './components/MainNav'
import ClickPic from './components/ClickPic'
import { Jumbotron } from 'reactstrap';
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
  }

  setShuffledArray = (event) => {

    let arrayCopy = this.state.charPics.slice(0)
    const clickedCharIndex = arrayCopy.findIndex(char => char.src === event.target.dataset.name)
    const marquee = document.querySelector('#marquee')
    const shakenDiv = document.querySelector('#shakenDiv')

    if (this.state.score === 11 && !arrayCopy[clickedCharIndex].clicked) {
      arrayCopy[clickedCharIndex].clicked = true
      return this.setState({
        marqueeText: "WINNER!!!!!",
        score: 12,
        topScore: 12
      })
    }

    
    if (arrayCopy[clickedCharIndex].clicked) {
      // CSS effects for shaking and blinking
      marquee.classList.add('blinkI')
      shakenDiv.classList.add('shake')
      setTimeout(() => {
        marquee.classList.remove('blinkI')
        shakenDiv.classList.remove('shake')
      }, 1000)

      
      return this.setState({
        score: 0,
        marqueeText: 'You guessed incorrectly!',
        charPics: JSON.parse(JSON.stringify(chars))
      })
    }

    arrayCopy[clickedCharIndex].clicked = true
    marquee.classList.add('blinkC')
    setTimeout(() => {
      marquee.classList.remove('blinkC')
    }, 1000)
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
          </Jumbotron>
        </div>
        <div className="container">
        <h2 id="marquee" className="font-weight-bold">{
              this.state.marqueeText
            }</h2>
        </div>
        <div className="container">
          <div className="row" id='shakenDiv'>
            {this.state.charPics.map(char => <ClickPic onClick={this.setShuffledArray} key={char.src}>{char}</ClickPic>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
