import * as React from 'react';
import { PureComponent } from 'react';
import { DateRangePicker } from 'react-dates';
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchIcon from '@material-ui/icons/Search';
import { DateRangePickerType } from 'src/types';

type Date = moment.Moment | undefined;

interface Props {
  startDate: string | undefined;
  endDate: string | undefined;
  onChangeDates: (startDate: string, endDate: string) => void;
}

interface State {
  focusedInput: DateRangePickerType;
  startDate: Date;
  endDate: Date;
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 120,
  },
  iconButton: {
    padding: 10,
  }
}

const convertToTimeStamp = (date: Date): string => {
  return moment(date).format('x');
}

class DatePicker extends PureComponent<Props, {}> {

  state: State = {
    focusedInput: null,
    startDate: undefined,
    endDate: undefined
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  }

  onFocusChange = (focusedInput: DateRangePickerType) => {
    this.setState({ focusedInput });
  }

  onSearchDates = () => {
    const { startDate, endDate } = this.state;
    this.props.onChangeDates(convertToTimeStamp(startDate), convertToTimeStamp(endDate))
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <Paper >
        <DateRangePicker
          startDateId={'StartDate'}
          endDateId={'EndDate'}
          startDate={startDate ? moment(startDate) : null}
          endDate={endDate ? moment(endDate) : null}
          isOutsideRange={() => false}
          focusedInput={this.state.focusedInput}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
        />
        <span style={{ marginLeft: '130px' }} onClick={this.onSearchDates}>
          <SearchIcon style={{ marginTop: '-30px', marginLeft: '10px', position: 'absolute' }} />
        </span>
      </Paper>
    );
  }
}

export default withStyles(styles)(DatePicker);
