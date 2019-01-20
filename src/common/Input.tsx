import * as  React from 'react';
import { PureComponent } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';
import { SearchValues } from 'src/types';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 120,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
};

interface Props {
  classes: any;
  search: boolean;
  searchKey: string;
  value: SearchValues;
  onClickSearchIcon?: (key: string, searchText: SearchValues) => void;
}

interface State {
  searchText: SearchValues;
}

class Input extends PureComponent<Props, State> {

  state: State = {
    searchText: this.props.value || '',
  }

  onChange = (event) => {
    this.setState({ searchText: event.target.value })
  }

  onSearchIconClick = () => {
    this.props.onClickSearchIcon!(this.props.searchKey, this.state.searchText)
  }

  render() {
    const { classes, search } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          value={this.state.searchText} 
          className={classes.input} 
          placeholder="Search Google Maps" 
          onChange={this.onChange} 
        />
        {
          search && 
          <IconButton className={classes.iconButton} aria-label="Search" onClick={this.onSearchIconClick}>
            <SearchIcon />
          </IconButton>
        }
      </Paper>
    );
  }
}

export default withStyles(styles)(Input);