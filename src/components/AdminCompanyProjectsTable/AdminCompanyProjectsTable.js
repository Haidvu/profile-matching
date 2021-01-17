import {Table,Link,Button,Grid,DialogContent,Select,MenuItem,Dialog,DialogTitle,DialogActions,TablePagination,TableFooter, Paper, TableBody, TableCell,TableContainer,TableHead,TableRow} from "@material-ui/core/";
import React,{useState} from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";
import PropTypes from 'prop-types';
import { makeStyles, withStyles,useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
  
const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    tableRoot:{
        margin: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    inProgress:{
        color: "white",
        background: "#00e676",
        "&:hover, &.Mui-focusVisible": {
            transition: "0.3s",
            color: "white",
            backgroundColor: "#00e676",
        },
        borderRadius:"10px",
        fontSize:"12px"
    },
    complete:{
        color: "white",
        background: "rgba(200,16,46,1)",
        "&:hover, &.Mui-focusVisible": {
            transition: "0.3s",
            color: "white",
            backgroundColor: "rgba(200,16,46,1)",
        },
        borderRadius:"10px",
        fontSize:"12px"
    },
    icon: {
        color: theme.palette.secondary.main,
    },
}));

function TablePaginationActions(props) {
const classes = useStyles();
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

const AdminMatchingTable = ({ projectsList,setModifiedProject }) => {
    const classes = useStyles();
    
    const [updateFail, setUpdateFail] = useState(false);
    const handleCloseUpdateFail = () => {
      setUpdateFail(false);
    };
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [alert, setAlert] = useState("");
    const [openDialog,setOpenDialog]=useState(false);
    const [currentProject,setCurrentProject]=useState({
        company_contact_email: "",
        company_name: "",
        company_website: "",
        date_added: "",
        is_published: true,
        project_deadline: "",
        project_description: "",
        project_id: 0,
        project_name: "",
        project_tech: "",
        project_type: "",
        username_id:0
    });
    
    const handleClickOpenEdit = (project) => {
        setCurrentProject(project);
        setOpenDialog(true);        
    }

    const handleSave = () => {
        const data = {
            project_name: currentProject.project_name,
            project_description: currentProject.project_description,
            project_type: currentProject.project_type,
            project_deadline: currentProject.project_deadline,
            project_tech: currentProject.project_tech,
            is_published: currentProject.is_published,
            username: currentProject.username_id,
        };
        axios
        .put("/company_project/" + currentProject.project_id + "/update",data,getConfig())
        .then((res) => {
            setModifiedProject(currentProject); 
            setOpenDialog(false);
            setUpdateFail(false)      
        })
        .catch((err) => {
            setAlert(err.message.data);  
            setUpdateFail(true)
            setAlert(""); 
        });
    }

    const handleCancel = () => {
        setOpenDialog(false);    
    }

    const handleProjectStatusChange = (e) => {
        setCurrentProject({
            ...currentProject,
            "is_published": e.target.value,
        });
    }
    const columns = [
        {label:"Company", key: "company_name", align:"center" }, 
        {label:"Project", key:"project_name", align:"center" } , 
        {label:"Project Status", key:"is_published", align:"center" }] 

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };
    
    return(
        <div>
            <div className={classes.tableRoot}>
                <TableContainer component={Paper}>
                    <Table stickyHeader={true} className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell key={column.key} align={column.align}>{column.label}</StyledTableCell>
                            ))}
                            <StyledTableCell align={"center"}>Change Status</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPage > 0
                        ? projectsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : projectsList
                        ).map((row,index) => (
                            <StyledTableRow key={index}>
                            {columns.map((column) => {
                                if(column.label === "Project"){
                                return (
                                    <TableCell key={column.key} align={column.align}>
                                        <Link
                                            style={{ textDecoration: "underline", color:"black" }}
                                            href={`/dashboard/projects/${row.project_id}`}
                                        >
                                        {row[column.key]}
                                        </Link>
                                    </TableCell>
                                ); 
                                }else if(column.label === "Project Status"){
                                    return(
                                    <TableCell key={column.key} align={column.align}>
                                        {row[column.key] ? 
                                            <Button className={classes.inProgress}>In Progress</Button> : 
                                            <Button className={classes.complete}>Complete</Button>
                                        }
                                    </TableCell>);
                                }else{
                                return (
                                <TableCell key={column.key} align={column.align}>
                                    {row[column.key]}
                                </TableCell>);
                                }
                            })}
                                <TableCell key={index} align={"center"}>
                                    <IconButton className={classes.icon} size="small" onClick={() => handleClickOpenEdit(row)}>
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={projectsList.length}
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
            {/* modal for changing project status */}
            <div>
                <Dialog
                    open={openDialog}
                    className={classes.dialog}
                >
                    <DialogTitle>
                        Change the status of the project:{" "}
                        {currentProject.project_name}
                    </DialogTitle>
                    <DialogContent>
                        <Select
                            id="is_published"
                            value={currentProject.is_published}
                            onChange={handleProjectStatusChange}
                        >
                            <MenuItem value={true}>In Progress</MenuItem>
                            <MenuItem value={false}>Complete</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleSave}
                            variant="contained" 
                            color="secondary"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="contained" 
                            color="secondary"
                        >
                            CANCEL
                        </Button>
                    </DialogActions>
                </Dialog>
           </div>
           <Snackbar
                open={updateFail}
                autoHideDuration={6000}
                onClose={handleCloseUpdateFail}
                >
                <Alert onClose={handleCloseUpdateFail} severity="error">
                    {alert}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default AdminMatchingTable