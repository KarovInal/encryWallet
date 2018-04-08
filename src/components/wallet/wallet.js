import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'material-ui';
import getLocalWallet from '../../selectors/get-local-wallet';
import { getPortfolio } from '../../selectors/portfolio';
import { getHistory } from '../../selectors/history';
import { redirectToWalletId, redirectToLogin } from '../../actions/redirects/redirects';
import { fetchPortfolio } from '../../ducks/portfolio';
import { fetchHistory } from '../../ducks/history';
import { Grid, Paper, ListItem, List, ListItemText, TextField, withStyles } from 'material-ui';
import { Pie } from "react-chartjs-2";

const getWalletIdUrl = ({ match }) => match.params.walletId;

const getTotalWallet = boxes => boxes.reduce((acc, { value }) => (acc + value), 0)

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

const mapStateToProps = (state, props) => ({
  walletId: getWalletIdUrl(props),
  portfolio: getPortfolio(state),
  history: getHistory(state)
});

const mapDispathToProps = (dispath, props) => bindActionCreators({
  redirectToLogin: () => redirectToLogin(props),
  redirectToWalletId: (walletId) => redirectToWalletId(props, walletId),
  fetchPortfolio,
  fetchHistory
}, dispath);

@connect(mapStateToProps, mapDispathToProps)
@withStyles(styles)
class Wallet extends Component {
  state = {
    fee: 100,
    amount: 0,
    sender: '4FGNGvVPnmx1Jc43iPTRscNvjMAaqWaMeZkATsGDmwpwLHx4jS',
    recipient: '4FGNGvVPnmx1Jc43iPTRscNvjMAaqWaMeZkATsGDmwpwLHx4jS'
  };

  componentDidMount() {
    const wallet = getLocalWallet();

    if(wallet.walletId) {
      this.props.redirectToWalletId(wallet.walletId);
      this.props.fetchPortfolio(wallet.walletId);
      this.props.fetchHistory();
    } else {
      this.props.redirectToLogin()
    }
  }

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
    const totalWallet = getTotalWallet(this.props.portfolio.boxes) + 1231312 || 0;
    const BTC = 1231312;
    const TOTAL = totalWallet + BTC;
    const procentBTC = ((BTC * 100) / TOTAL) * 100;
    const walletProcent = 100 - procentBTC;
    const { classes } = this.props;
    console.log('this.props.history', this.props.history);
    return (
      <Grid container justify="center" spacing={16} xs={12} style={{ margin: '0 auto', width: "900px", height: '100%' }}>
        <Grid item xs={6}>
          <Paper style={{ textAlign: 'center', padding: '5px' }}>
            <h2>БАЛАНС: { totalWallet }</h2>
            <Pie labels={['Баланс']} data={{
                labels: [ 'ETH', 'BTC' ],
                datasets: [{
                  data: [walletProcent, procentBTC],
                  backgroundColor: [ '#FFCE56', '#36A2EB' ]
                }]
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper style={{ textAlign: 'center', padding: '5px' }}>
            <h2>Список операций:</h2>
            <List>

              {
                this.props.history
                ? this.props.history.map(transaction => (
                    <ListItem>
                      <ListItemText primary={`Сумма: ${transaction.amount}`} secondary={`${transaction.address.slice(0, 25)}...`} />
                    </ListItem>
                  ))
                : null
              }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ textAlign: 'center', padding: '5px' }}>
            <h3 className="App-title">Создание транзакции</h3>
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
            <TextField
              id="recipient"
              label="Получатель"
              value={this.state.recipient}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <br/>
            <Button variant="raised" color="primary" onClick={this.handleSubmit}>Отправить</Button>
            <br/>
            <br/>
            <Button variant="raised" color="primary" onClick={this.handleBoxes}>Посчитать boxes</Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Wallet;
