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
    charPics: chars.slice(0),
    marqueeText: ''
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
    console.log(clickedCharIndex)
    // let arrayCopy = this.shuffleArray(this.state.charPics.slice(0))
    this.shuffleArray(arrayCopy)

    this.setState({
      charPics: arrayCopy
    })
  }

  render() {
    return (
      <div className="App">
        <MainNav>{
          {
            score: this.state.score,
            topScore: this.state.topScore,
            marqueeText: this.state.marqueeText
          }
        }</MainNav>
        <div>
          <Jumbotron>
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>

            <p className="lead">
              <Button color="primary" onClick={this.incScore} className="mr-2">Score Up</Button>
              <Button color="primary" onClick={this.resetScore} className="mr-2">Reset Score</Button>
              <Button color="primary" onClick={this.resetAllScores} className="mr-2">Reset All</Button>
              <Button color="primary" onClick={console.log(this.state)} className="mr-2">State</Button>
              <Button color="primary" onClick={this.setShuffledArray} className="mr-2">Shuffle</Button>


            </p>
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
