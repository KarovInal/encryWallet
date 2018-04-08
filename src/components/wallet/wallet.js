import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'material-ui';
import getLocalWallet from '../../selectors/get-local-wallet';
import { getPortfolio } from '../../selectors/portfolio';
import { redirectToWalletId, redirectToLogin } from '../../actions/redirects/redirects';
import { fetchPortfolio } from '../../ducks/portfolio';
import { Grid, Paper } from 'material-ui';
import { Pie } from "react-chartjs-2";

const getWalletIdUrl = ({ match }) => match.params.walletId;

const getTotalWallet = boxes => boxes.reduce((acc, { value }) => (acc + value), 0)

const mapStateToProps = (state, props) => ({
  walletId: getWalletIdUrl(props),
  portfolio: getPortfolio(state)
});

const mapDispathToProps = (dispath, props) => bindActionCreators({
  redirectToLogin: () => redirectToLogin(props),
  redirectToWalletId: (walletId) => redirectToWalletId(props, walletId),
  fetchPortfolio
}, dispath);

@connect(mapStateToProps, mapDispathToProps)
class Wallet extends Component {
  componentDidMount() {
    const wallet = getLocalWallet();

    if(wallet.walletId) {
      this.props.redirectToWalletId(wallet.walletId);
      this.props.fetchPortfolio(wallet.walletId);
    } else {
      this.props.redirectToLogin()
    }
  }

  render() {
    const totalWallet = getTotalWallet(this.props.portfolio.boxes) + 1231312 || 0;
    const BTC = 1231312;
    const TOTAL = totalWallet + BTC;
    const procentBTC = ((BTC * 100) / TOTAL) * 100;
    const walletProcent = 100 - procentBTC;

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
          <Paper>
            Список операций:
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Wallet;
