import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { redirectToWallet } from '../../actions/redirects/redirects';
import { saveKeyPair, saveKeyPublic, saveWallet } from '../../ducks/key-pair';
import {
  withStyles,
  Paper,
  Typography,
  Grid,
  Button,
  TextField
} from 'material-ui';
import styles from './assets/styles/style';
import nope from '../../libs/nope';
import createPair from '../../libs/createPair';
import { LOGIN, REGISTER, WALLET} from '../../constants/routers';

const MapDispatchToProps = (dispatch, props) => bindActionCreators({
  saveKeyPair,
  saveKeyPublic,
  saveWallet,
  redirectToWallet: () => redirectToWallet(props)
}, dispatch);

@connect(nope, MapDispatchToProps)
@withStyles(styles)
@withRouter
class Register extends Component {
  state = {
    idWallet: '',
    passwordWallet: '',
    privateWallet: ''
  }

  handleWalletId = ({ target }) => {
    this.setState({
      idWallet: target.value
    });
  }

  handlePasswordWallet = ({ target }) => {
    this.setState({
      passwordWallet: target.value
    });
  }

  handlePrivateWallet = ({ target }) => {
    this.setState({
      privateWallet: target.value
    });
  }

  handleSavePublicKey = () => {
    const { idWallet, passwordWallet, privateWallet } = this.state;

    this.props.saveWallet(idWallet, privateWallet, passwordWallet);
    this.props.saveKeyPublic(this.state.idWallet);
    this.props.redirectToWallet();
  }

  handleCreateWallet = () => {
    createPair()
      .then(keyPairWallet => {
        this.props.saveKeyPair(keyPairWallet);
        this.props.redirectToWallet();
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderRegisterButtons() {
    return (
      <Grid spacing={8} container direction="column">
        <Grid item>
          <Button
            fullWidth
            onClick={this.handleCreateWallet}
            variant="raised"
            color="primary">
              СОЗДАТЬ КОШЕЛЕК
          </Button>
        </Grid>
        <Grid item>
          <Link to={LOGIN}>
            <Button fullWidth variant="raised" color="secondary">У МЕНЯ УЖЕ ЕТСЬ</Button> 
          </Link>
        </Grid>
      </Grid>
    )
  }

  renderLoginButtons() {
    return (
      <Grid spacing={8} container direction="column">
        <Grid item>
          <TextField onChange={this.handleWalletId} fullWidth id="idWallet" label="ID кошелька" />
          <TextField onChange={this.handlePrivateWallet} type="password" fullWidth id="privateKeyWallet" label="Приватный ключ" />
          <TextField onChange={this.handlePasswordWallet} type="password" fullWidth id="passwordWallet" label="Пароль кошелька" />
        </Grid>
        <Grid item>
          <Button
            onClick={this.handleSavePublicKey}
            fullWidth
            variant="raised"
            color="primary">
              ВОЙТИ
          </Button>
        </Grid>
        <Grid item>
          <Link to={REGISTER}>
            <Button
              fullWidth
              variant="raised"
              color="secondary">
                СОЗДАТЬ КОШЕЛЕК
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }

  renderTitle() {
    const { match: { url = '' } } = this.props;

    if(url.includes(LOGIN)) {
      return <h3>Логин:</h3>
    }

    if(url.includes(REGISTER)) {
      return <h3>Регистрация:</h3>
    }

    return <h3>WTF&!</h3>
  }

  renderActions() {
    const { match: { url = '' } } = this.props;

    if(url.includes(LOGIN)) {
      return this.renderLoginButtons();
    }

    if(url.includes(REGISTER)) {
      return this.renderRegisterButtons();
    }

    return '';
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center" className={classes.registerWrap}>
        <Grid item>
          <Paper className={classes.modal} >
            { this.renderTitle() }
            { this.renderActions() }
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default Register;
