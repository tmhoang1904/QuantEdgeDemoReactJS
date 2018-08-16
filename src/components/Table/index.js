import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import numeral from 'numeral';

import styles from './styles';

class StockTable extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.col1}>Code</TableCell>
              <TableCell className={classes.col2}>Company</TableCell>
              <TableCell className={classes.col3} numeric>
                Price
              </TableCell>
              <TableCell className={classes.col4} numeric>
                Value
              </TableCell>
              <TableCell className={classes.col5} numeric>
                Change
              </TableCell>
              <TableCell className={classes.col6} numeric>
                %Change
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => {
              const changeTextClass =
                item.change !== 0 ? (item.change > 0 ? classes.textIncrease : classes.textDecrease) : '';
              return (
                <TableRow key={item.id}>
                  <TableCell style={{ color: 'blue' }} component="th" scope="row">
                    {item.company && item.company.code ? item.company.code : ''}
                  </TableCell>
                  <TableCell style={{ color: 'gray' }}>
                    {item.company && item.company.name ? item.company.name.toUpperCase() : ''}
                  </TableCell>
                  <TableCell className={classes.numberic} numeric>
                    {item.price ? item.price.toFixed(2) : ''}
                  </TableCell>
                  <TableCell className={classes.numberic} numeric>
                    {item.value ? numeral(item.value).format('0,0') : ''}
                  </TableCell>
                  <TableCell
                    className={classes.numberic}
                    className={[changeTextClass, classes.numberic].join(' ')}
                    numeric
                  >
                    {typeof item.change !== 'undefined' && item.change !== 0 ? item.change.toFixed(2) : '--'}
                  </TableCell>
                  <TableCell className={[changeTextClass, classes.textRight, classes.numberic].join(' ')}>
                    {typeof item.changePercent !== 'undefined' && item.changePercent !== 0
                      ? item.changePercent.toFixed(2).toString() + '%'
                      : '--'}
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
