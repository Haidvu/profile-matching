import {Table,Link, Grid, TablePagination,TableFooter, LinearProgress, Paper, TableBody, TableCell,TableContainer,TableHead,TableRow, Button} from "@material-ui/core/";
import React from "react";
import PropTypes from 'prop-types';
import { useRouteMatch } from "react-router-dom";
import { makeStyles, withStyles,useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { CSVLink } from "react-csv";

const useStyles = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  exportButton:{
    marginTop:theme.spacing(0.5),
    marginBottom:theme.spacing(0.5)
  },
  exportText:{
    color:"white",
    textDecoration:"none"
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#dd2c00",
    color: theme.palette.common.white,
  }
}))(TableCell);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Grid className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Grid>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const AdminMatchingTable = ({ loading, matchingList }) => {
    const classes = useStyles();
    let { url } = useRouteMatch();
    const columns = [
    {label:"Company", key: "company_name", align:"center" }, 
    {label:"Project", key:"project_name", align:"center" } , 
    {label:"Student", key:"student_name", align:"center" }, 
    {label:"PeopleSoft ID", key: "student_id", align:"center" }, 
    {label:"Company Preference", key:"project_preference_for_student", align:"center" },
    {label:"Student Preference", key:"student_preference_for_project",align:"center" }];
 
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    return (
        <div className={classes.root}>
          {loading ? (
            <LinearProgress
              color="secondary"
              style={{ margin: "20px" }}
            />
          ) : (
            <div>
              <div>
                <Button className={classes.exportButton} variant="contained" color="secondary">
                  <CSVLink
                    data={matchingList}
                    headers={columns}
                    filename={"MatchingReport.csv"}
                    className={classes.exportText} 
                  >
                    Export
                  </CSVLink>
                </Button>
              </div>
              <TableContainer component={Paper}>
                  <Table stickyHeader={true} className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                              <StyledTableCell key={column.key} align={column.align}>{column.label}</StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {(rowsPerPage > 0
                        ? matchingList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : matchingList
                      ).map((row,index) => (
                          <StyledTableRow key={index}>
                            {columns.map((column) => {
                              if(column.label === "Project"){
                                return (
                                    <TableCell key={column.key} align={column.align}>
                                      <Link
                                       style={{ textDecoration: "underline", color:"black" }}
                                       href={`${url}/projects/${row.project_id}`}
                                        >
                                        {row[column.key]}
                                      </Link>
                                    </TableCell>
                                ); 
                              }else if(column.label==="Student"){
                                return (
                                  <TableCell key={column.key} align={column.align}>
                                    <Link
                                      style={{ textDecoration: "underline", color:"black" }}
                                      href={`${url}/search/${row.student_db_id}`}
                                      >
                                      {row[column.key]}
                                    </Link>
                                  </TableCell>
                              ); 
                              }else{
                              return (
                                <TableCell key={column.key} align={column.align}>
                                  {row[column.key]}
                                </TableCell>
                              );
                            }
                            })}
                          </StyledTableRow>
                      ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={matchingList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { 'aria-label': 'rows per page' },
                              native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                  </Table>
              </TableContainer>
            </div>
          )}
        </div>
    );
};

export default AdminMatchingTable;