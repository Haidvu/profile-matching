
import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  projectAdd: {
      '&:hover': {
        backgroundColor: '#C8102E',
      },
      margin: theme.spacing(1),
    },
    addNewTitle: {
        fontWeight: 'bold',
    },
    projectDate: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));


export default function FormDialog() {

  
  const classes = useStyles();
  // const [value, setValue] = React.useState('Controlled');

  // const handleChange = (event) => {
  //   setValue(event.target.value);                 //changes values of the boxes on change
  //   // setCurrency(event.target.value);            //changes values of Menu box for ProjectTech
  // }; NEED TO FINISH THIS

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const animatedComponents = makeAnimated();
  const options = [
  {
    value: '1',
    label: 'Angular',
  },
  {
    value: '2',
    label: '.NET',
  },
  {
    value: '3',
    label: 'Python',
  },
  {
    value: '4',
    label: 'React',
  },
  {
    value: '5',
    label: 'C++',
  },
  {
    value: '6',
    label: 'Python',
  },
  {
    value: '7',
    label: 'JavaScript',
  },
  {
    value: '8',
    label: 'Flash',
  },
  {
    value: '9',
    label: 'Selenium',
  },
];
  const list = [{label:'C++', value:0}, {label:'Java', value:1}]


  

  return (
    <div>
        <div className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
            <Button onClick={handleClickOpen} size="medium" variant="outlined" className={classes.projectAdd} style={{ backgroundColor: '#C8102E', color: '#FFFFFF', margin: '20px' }}>
                <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            ADD NEW PROJECT
            </Button>
            </div>
        </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={classes.addNewTitle}id="form-dialog-title">ADD NEW PROJECT</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Role"
            type="email"
            fullWidth
            variant="outlined"
          />
          <Select
                      AutoSize={true}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      defaultValue={list}
                      isMulti
                      isSearchable
                      options={options}
                    />
          
          <TextField
          margin="dense"
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="Project Description"
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 350 }}
        />
        <TextField
            margin="dense"
            id="outlined-static"
            helperText="Source Link"
            defaultValue="ex) www.myproject.com"
            type="email"
            fullWidth
            variant="outlined"
          />
        <TextField
        margin="dense"
        id="date"
        type="date"
        defaultValue="2020-11-01"
        className={classes.projectDate}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        helperText="Start Date"
      />
      <TextField
        margin="dense"
        id="date"
        type="date"
        defaultValue="2020-11-01"
        className={classes.projectDate}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        helperText="End Date"
      />
       <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        
        <FormControlLabel
          value="end"
          control={<Checkbox style={{ color: '#C8102E'}} />}
          label={<Typography style={{fontSize: 15}}>Check if project "In Progress"</Typography>}
          labelPlacement="In Progress"
          
        />
      </FormGroup>
    </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  style={{ backgroundColor: '#f0f0f0', color: '#C8102E'}}>
            Cancel
          </Button>
          <Button onClick={handleClose} style={{ backgroundColor: '#C8102E', color: '#FFFFFF'}} className={classes.projectAdd}>
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}