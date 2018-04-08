import React, { Component } from 'react';
import { withStyles, Grid } from 'material-ui';
import bg from './bg.jpg';
import wallet from './wallet.png';
import code from './code.png';

const styles = {
  productWrap: {
    padding: '50px',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}


@withStyles(styles)
class Products extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center" className={classes.productWrap}>
        <Grid item style={{ margin: '20px', textAlign: 'center' }}>
          <a href="/login" style={{ textDecoration: 'none' }}>
            <img style={{ height: '150px' }} src={wallet} />
            <h3>EncryCore Wallet</h3>
          </a>
        </Grid>
        <Grid item style={{ margin: '20px', textAlign: 'center' }}>
          <a href="/editor" style={{ textDecoration: 'none' }}>
            <img style={{ height: '150px' }} src={code} />
            <h3>EncryCore Editor</h3>
          </a>
        </Grid>
      </Grid>
    )
  }
}

export default Products;
