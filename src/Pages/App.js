import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import LoadingGIF from '../Assets/loading.gif';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      question: "",
      option1: "",
      option2: "",
      votes_opt_1: 0,
      votes_opt_2: 0,

      errorOcurred: false,

      shouldLoadQuestion: false,
      shouldRenderAnswers: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/randomthisorthat')
      .then((response) => {
        console.log(response.data[0]);

        this.setState({
          id: response.data[0].id,
          question: response.data[0].question,
          option1: response.data[0].option1,
          option2: response.data[0].option2,
          votes_opt_1: response.data[0].votes_opt_1,
          votes_opt_2: response.data[0].votes_opt_2
        }, () => this.setState({ shouldLoadQuestion: true }));
      })
      .catch((error) => {
        console.error(error);

        this.setState({ errorOcurred: true });
      });
  }

  renderLoadingGIF = () => {
    if (!this.state.shouldLoadQuestion) return <img alt="Loading..." src={LoadingGIF} />
  }

  renderQuestion = () => {
    if (this.state.shouldLoadQuestion) {
      console.log(this.state.votes_opt_1);
      return <div className='question'>
        <div style={{ 'textAlign': "center" }}>
          <h1>{this.state.question}</h1>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="buttons">
          <Button
            onClick={
              () => {
                this.setState({ shouldRenderAnswers: true });
                this.incrementSelectedThisOrThat(this.state.votes_opt_1 + 1, this.state.votes_opt_2, this.state.id);
              }
            }
            variant="primary" style={{ 'float': 'left', "marginLeft": "50px", "padding": '30px', "fontSize": "30px" }}
            id="opt1"
            disabled={this.state.shouldRenderAnswers ? true : false}>
            {this.state.option1}
          </Button>

          <h3 style={{ 'float': 'left', "marginLeft": "50px", 'display': [this.state.shouldRenderAnswers ? "block" : "none"] }}>{this.calcPercentage(this.state.votes_opt_1, (this.state.votes_opt_1 + this.state.votes_opt_2))}%</h3>

          <Button
            onClick={
              () => {
                this.setState({ shouldRenderAnswers: true });
                this.incrementSelectedThisOrThat(this.state.votes_opt_1, this.state.votes_opt_2 + 1, this.state.id);
              }
            }
            variant="danger" style={{ 'float': 'right', "marginRight": "50px", "padding": '30px', "fontSize": "30px" }}
            id="opt2"
            disabled={this.state.shouldRenderAnswers ? true : false}>
            {this.state.option2}
          </Button>

          <h3
            style={{ 'float': 'right', "marginRight": "50px", 'display': [this.state.shouldRenderAnswers ? "block" : "none"] }}>
            {this.calcPercentage(this.state.votes_opt_2, (this.state.votes_opt_1 + this.state.votes_opt_2))}%
          </h3>
        </div>
      </div>
    }
  }

  calcPercentage = (fraction, whole) => {
    return fraction / whole * 100
  }

  renderNextButton = () => {
    if (this.state.shouldRenderAnswers) return <Button onClick={() => window.location.reload()} variant="info">Next Question</Button>
  }

  renderNumberOfPeopleThatAnswered = () => {
    if (this.state.shouldRenderAnswers) return <h6>Pessoas que votaram: {this.state.votes_opt_1 + this.state.votes_opt_2}</h6>
  }

  incrementSelectedThisOrThat = (votes_opt_1, votes_opt_2, id) => {
    axios.post('http://localhost:5000/updatethisorthat', { votes_opt_1: votes_opt_1, votes_opt_2: votes_opt_2, id: id });
  }

  renderError = () => {
    if (this.state.errorOcurred) {
      return <h1>An error ocurred! :/ We are sorry...</h1>
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderLoadingGIF()}
        {this.renderQuestion()}
        <div style={{ 'textAlign': "center" }}>
          {this.renderNextButton()}
          {this.renderNumberOfPeopleThatAnswered()}
        </div>
        {this.renderError()}
      </div>
    );
  }
}

export default App;
