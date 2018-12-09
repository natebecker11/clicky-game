import React, { Component } from 'react';
import MainNav from './components/MainNav'
import ClickPic from './components/ClickPic'
import { Jumbotron, Button } from 'reactstrap';

import './App.css';

class App extends Component {
  
  state = {
    score: 0,
    topScore: 0,
    clickPics: [],
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


            </p>
          </Jumbotron>
        </div>
        <div className="container">
          <div className="row">
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />
            <ClickPic />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
