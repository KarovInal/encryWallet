import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  numericField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
  },
  menu: {
    width: 300,
  },
});

class App extends Component {
  state = {
    fee: 100,
    amount: 0,
    sender: '4FGNGvVPnmx1Jc43iPTRscNvjMAaqWaMeZkATsGDmwpwLHx4jS',
    recipient: '4FGNGvVPnmx1Jc43iPTRscNvjMAaqWaMeZkATsGDmwpwLHx4jS'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  generateUseBoxes = async (amount) => {
    //First let's get all available blocks
    let url = 'http://unblock.southeastasia.cloudapp.azure.com:9051/account/' + this.state.sender + '/portfolio';
    
    var boxes = [];
    var totalAmount = 0;
    try {
      const result = await fetch(url);
      const data = await result.json();
  
      for (var i in data.boxes) {
        totalAmount += data.boxes[i].value;
        boxes.push(data.boxes[i].id);        
        if (totalAmount >= amount) {
          break;
        }
      }
      return boxes;
    } catch(err) {
      console.error('Error:', err)
    }
  }

  handleBoxes = async () => {
    var boxes = await this.generateUseBoxes(this.state.amount);
    console.log(boxes);
  }

  handleSubmit = () => {
    console.log('handleSubmit');
    var timeStampInMs = parseInt(window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now());

    console.log(timeStampInMs, Date.now());

    let transactionInfo = {
      accPubKey: "CcpjNDYxS726CURZZt3aoJZWmNW88gcdw9TQqHydVRQB",
      sig: "ahpXMwWN5P9nWJ7qqwZfLauAdcZHX9n6s29QQ9vKZqu9",
      fee: this.state.fee,
      change: 0,
      timestamp: timeStampInMs,
      useBoxes: this.generateUseBoxes(this.state.amount),
      recipient: this.state.recipient,
      amount: this.state.amount
    };

    let url = 'http://unblock.southeastasia.cloudapp.azure.com:9051/transactions/transfer'
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(transactionInfo), 
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <h1 className="App-title">Создание транзакции</h1>
        <TextField
          id="number"
          label="Сумма"
          value={this.state.amount}
          onChange={this.handleChange('amount')}
          type="number"
          className={classes.numericField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="number"
          label="Комиссия"
          value={this.state.fee}
          onChange={this.handleChange('fee')}
          type="number"
          className={classes.numericField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <br/>
        <TextField
          id="recipient"
          label="Получатель"
          className={classes.textField}
          value={this.state.recipient}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <br/>
        <Button variant="raised" color="primary" onClick={this.handleSubmit}>Отправить</Button>
        <Button variant="raised" color="primary" onClick={this.handleBoxes}>Посчитать boxes</Button>
      </div>
    );
  }
}