import React, { Component } from 'react';
import { Tabs, AppBar, Tab, Typography, Toolbar, Grid, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { getTopGainers, getTopLosers, calcDataFluctuation } from './DataProvider';

import * as Services from './services';

import StockTable from './components/Table';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4'
    },
    textSecondary: {
      main: 'white'
    }
  },
  shadows: Array(25).fill('none')
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  flex: {
    flexGrow: 1
  },
  fullHeight: {
    ...theme.mixins.toolbar
  },
  toolbar: {
    paddingRight: 0
  },
  toolbarText: {
    color: 'white'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressContainer: {
    width: '100%',
    textAlign: 'center'
  }
});

// const data = [];

class App extends Component {
  constructor(props) {
    super(props);
    // const data = getInitData();
    this.state = {
      value: 0,
      initData: [],
      data: [],
      topGainers: [],
      topLosers: [],
      loading: true
    };
  }

  componentDidMount() {
    Services.requestData()
      .then(data => {
        const topGainers = getTopGainers(data);
        const topLosers = getTopLosers(data);

        this.setState(
          {
            initData: data,
            data,
            topGainers,
            topLosers,
            loading: false
          },
          () => {
            this.intervalId = setInterval(() => {
              const newData = calcDataFluctuation(this.state.initData, this.state.data);
              const topGainers = getTopGainers(newData);
              const topLosers = getTopLosers(newData);
              this.setState({
                data: newData,
                topGainers,
                topLosers
              });
            }, 5 * 1000);
          }
        );
      })
      .catch(err => {});
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, topGainers, topLosers, loading } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography className={classes.toolbarText} variant="title">
                    {'S&P/ASX'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tabs classes={{ root: classes.fullHeight }} onChange={this.handleChange} value={value}>
                    <Tab classes={{ root: classes.fullHeight }} className={classes.toolbarText} label="TOP GAINERS" />
                    <Tab classes={{ root: classes.fullHeight }} className={classes.toolbarText} label="TOP LOSERS" />
                  </Tabs>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {value === 0 && <StockTable data={topGainers} />}
          {value === 1 && <StockTable data={topLosers} />}
          {loading && (
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} size={50} />
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
