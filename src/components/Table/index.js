import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import numeral from 'numeral';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  textRight: {
    textAlign: 'right'
  },
  textIncrease: {
    color: 'green'
  },
  textDecrease: {
    color: 'red'
  }
});

class StockTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, data } = this.props;    
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Company</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell numeric>Value</TableCell>
              <TableCell numeric>Change</TableCell>
              <TableCell numeric>%Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => {
              const changeTextClass = item.change !== 0 ? (item.change > 0 ? classes.textIncrease : classes.textDecrease) : '';
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.company.code}
                  </TableCell>
                  <TableCell>{item.company.name}</TableCell>
                  <TableCell numeric>{item.price.toFixed(2)}</TableCell>
                  <TableCell numeric>{numeral(item.value).format('0,0')}</TableCell>
                  <TableCell className={changeTextClass} numeric>
                    {item.change.toFixed(2)}
                  </TableCell>
                  <TableCell className={changeTextClass + ' ' + classes.textRight}>
                    {item.changePercent.toFixed(2).toString() + '%'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

StockTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(StockTable);
