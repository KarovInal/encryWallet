import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
  Typography,
  AppBar,
  Toolbar
} from 'material-ui';

class BarApp extends Component {
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography color="inherit">EncryCore</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default BarApp;
