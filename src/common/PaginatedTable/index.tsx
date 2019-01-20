import * as React from 'react';
import { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { TableHeadOptions, SortingOptions, SearchOptions } from 'src/types';
import * as moment from 'moment'
import { FilterType } from 'src/constants';
import Input from '../Input';
import DatePicker from '../DatePicker';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
  items: any;
  tableHeadOptions: TableHeadOptions[];
  sorting: SortingOptions[];
  rowsPerPage: number;
  page: number;
  totalItems: number;
  searching: SearchOptions[];
  startDate: string | undefined;
  endDate: string | undefined;
  onChangePage: (page: number) => void;
  onChangeSort: (key: string, isRemove?: boolean) => void;
  onSearch: (key: string, text: string) => void;
  onChangeDates?: (key: string, startDate: string, endDate: string) => void;
}

const TableRowHeadOptions = ({ row, element, createSortHandler }) => (
  <TableCell
    key={row.id}
    sortDirection={element ? element.sortDirection : false}
  >
    <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
    >
      <TableSortLabel
        active={element ? true : false}
        direction={element ? element.sortDirection : undefined}
        onClick={() => createSortHandler(row.id)}
      >
        {row.title}
      </TableSortLabel>
    </Tooltip>
    {
      element &&
      <Tooltip
        title="Remove"
        placement={'bottom-end'}
        enterDelay={300}
      >
        <IconButton aria-label="Clear" onClick={() => createSortHandler(row.id, true)}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    }
  </TableCell>
);

export default class PaginatedTable extends PureComponent<Props, {}> {

  onChangePage = (event: any, page: number) => {
    this.props.onChangePage(page);
  }

  handleChangeRowsPerPage = (event: any) => {
    console.log('ROWS_CHANGED', event);
    this.setState({ rowsPerPage: event.target.value });
  }

  createSortHandler = (id: string, isRemove: boolean = false) => {
    console.log('ID', id, isRemove);
    this.props.onChangeSort(id, isRemove);
  }

  onChangeDates = (key: string, startDate: string, endDate: string) => {
    this.props.onChangeDates!(key, startDate, endDate);
  }

  renderFilters = () => (
    <TableHead> 
      <TableRow>
        {
          this.props.tableHeadOptions.map((item, index) => {
            const element: SearchOptions | undefined = this.props.searching.find(i => i.id === item.id);
            return (
              <TableCell key={index}>
                {
                  item.filterType === FilterType.Search_box &&
                  <Input
                    value={element ? element.value : undefined}
                    search={true}
                    searchKey={item.id}
                    onClickSearchIcon={this.onSearchPressed}
                  />
                }
                 <div  >
                  {
                    item.filterType === FilterType.Date_Picker &&
                    <DatePicker
                      startDate={this.props.startDate}
                      endDate={this.props.endDate}
                      onChangeDates={(startDate, endDate) => this.onChangeDates(item.id, startDate, endDate)}
                    />
                  }
                </div>

              </TableCell>
            )
          })
        } 

      </TableRow>
    </TableHead>
  )

  renderTableHead = () => (
    <TableHead>
      <TableRow>
        {
          this.props.tableHeadOptions.map((item, index) => {
            let element: SortingOptions | undefined = this.props.sorting.find(i => i.id === item.id);
            return (
              <TableRowHeadOptions
                key={index}
                row={item}
                element={element}
                createSortHandler={this.createSortHandler}
              />
            )
          })
        }
      </TableRow>
    </TableHead>
  )

  onSearchPressed = (key: string, text: string) => {
    this.props.onSearch(key, text);
  }

  render() {
    const { items, rowsPerPage, page, totalItems } = this.props;
    return (
      <Table>
        {this.renderTableHead()}
        {this.renderFilters()}
        <TableBody>
          {
            items.map((item, index) => (
              <TableRow
                hover={true}
                key={index}
              >
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.surname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNo || '-'}</TableCell>
                <TableCell>{item.account.residenceCountry}</TableCell>
                <TableCell>{item.account.residenceCity}</TableCell>
                <TableCell>{moment(item.lastActive).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={totalItems}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              onChangePage={this.onChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}