import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Grid, Typography, TextField, Button, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import FilterListIcon from "@material-ui/icons/FilterList";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const useStyles = makeStyles((theme) => ({
  searchBackground: {
    // backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/1181619/pexels-photo-1181619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`,
    backgroundColor: "rgba(200,16,46,1)",
    margin: "10px",
    borderRadius: "5px",
    flex: "column",
  },
  header: {
    textAlign: "center",
    fontSize: "60px",
    fontWeight: "400",
    color: "white",
    fontFamily: "Helvetica",
    marginBottom: theme.spacing(1.5),
  },
  keywordHeading: {
    display: "flex-start",
    justifyContent: "center",
    fontFamily: "Helvetica",
    color: "white",
    marginLeft: theme.spacing(3.0),
    marginBottom: theme.spacing(0),
  },
  keywordSearch: {
    backgroundColor: "white",
    borderRadius: "10px",
    // objectFit:"contain",
    width: "90%",
    display: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: theme.spacing(3.0),
  },
  searchButton: {
    display: "flex-start",
    justifyContent: "center",
    margin: 10,
  },
  rootAccordion: {
    width: "100%",
  },
  accordionExpand: {
    backgroundColor: "rgba(200,16,46,1)",
  },
  advancedSearchButton: {
    // fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    // flexShrink: 0,
    color: "red",
    display: "center",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    margin: "0 auto",
    paddingBottom: 5,
  },
  SearchLabels: {
    fontFamily: "sans-serif",
    color: "white",
    display: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  searchSelect: {
    objectFit: "contain",
    borderRadius: "10px",
    width: 200,
    margin: theme.spacing(1.5),
  },
  filterButton: {
    display: "flex-start",
    justifyContent: "center",
    marginTop: 25,
    background: "rgba(200,16,46,1)",
    color: "white",
  },
}));

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
  control: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export const StudentSearch = () => {
  // const [searchInput, setSearchInput] = useState({
  //   company_name: null,
  //   industry_type: null,
  //   project_name: null,
  //   project_type:[],
  //   project_tech:[],
  //   keywords: []
  // })

  // const handleClick = () =>{
  //   console.log(searchInput);
  // }

  // const handleChange = (e) =>{
  //   if (e.key === 'Enter') {
  //       setSearchInput({...searchInput,
  //           keywords:[...searchInput.keywords, e.target.value]});
  //   }
  // }

  const classes = useStyles();
  //this is the animated component for the react-select library
  const animatedComponents = makeAnimated();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <div className={classes.searchBackground}>
        <Grid>
          <Typography className={classes.header}>FutureStart Search</Typography>
        </Grid>
        {/* <Grid className={classes.chipRoot}>
          {searchInput.keywords.map((data,index) => (
           <li key={index}>
              <Chip
              label={data}
              onDelete={handleDelete(data)}
              className={classes.chip}
              />
          </li>
        ))}
        </Grid> */}
        <Grid
        // container
        // id="master"
        // direction="row"
        // justify="space-between"
        // spacing={2}
        // alignItems="center"
        // alignContent="center"
        >
          <Grid
            // container
            id="first-left"
            item
            xs={12}
            spacing={4}
            direction="row"
          >
            <Grid item>
              <Typography className={classes.keywordHeading} variant="h5">
                Keyword
              </Typography>
              <TextField
                className={classes.keywordSearch}
                name="keywords"
                placeholder="Please enter keyword(s) for search"
                type="search"
                variant="outlined"
                size="small"
              />
              <Button className={classes.searchButton} variant="contained">
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
          {/* START OF REFINED SEARCHED */}
          <div className={classes.rootAccordion}>
            <Grid>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  className={classes.accordionExpand}
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Button
                    className={classes.advancedSearchButton}
                    variant="outlined"
                  >
                    ADVANCED SEARCH
                    <FilterListIcon />
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    id="master"
                    direction="column"
                    justify="space-between"
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid
                      container
                      id="first-left"
                      item
                      xs={12}
                      spacing={4}
                      direction="row"
                    >
                      <Grid item>
                        <Typography
                          className={classes.searchLabels}
                          variant="h5"
                        >
                          Company Name
                        </Typography>
                        <Select
                          AutoSize={true}
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          isSearchable
                          className={classes.searchSelect}
                          //  onChange={(e) => {
                          //     e = e ? e : [];
                          //     var skillsSeparatedByCommas = Array.prototype.map.call(e, s => s.label).toString();
                          //     setSearchInput({ ...searchInput, student_skills: skillsSeparatedByCommas.split(",")})
                          //     }}
                          // options={skills}
                          styles={customStyles}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.searchLabels}
                          variant="h5"
                        >
                          Industry Type
                        </Typography>
                        <Select
                          AutoSize={true}
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          isSearchable
                          className={classes.searchSelect}
                          //  onChange={(e) => {
                          //     e = e ? e : [];
                          //     var skillsSeparatedByCommas = Array.prototype.map.call(e, s => s.label).toString();
                          //     setSearchInput({ ...searchInput, student_skills: skillsSeparatedByCommas.split(",")})
                          //     }}
                          // options={skills}
                          styles={customStyles}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.searchLabels}
                          variant="h5"
                        >
                          Project Name
                        </Typography>
                        <Select
                          AutoSize={true}
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          isSearchable
                          className={classes.searchSelect}
                          //  onChange={(e) => {
                          //     e = e ? e : [];
                          //     var skillsSeparatedByCommas = Array.prototype.map.call(e, s => s.label).toString();
                          //     setSearchInput({ ...searchInput, student_skills: skillsSeparatedByCommas.split(",")})
                          //     }}
                          // options={skills}
                          styles={customStyles}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.searchLabels}
                          variant="h5"
                        >
                          Project Type
                        </Typography>
                        <Select
                          AutoSize={true}
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          isSearchable
                          className={classes.searchSelect}
                          //  onChange={(e) => {
                          //     e = e ? e : [];
                          //     var skillsSeparatedByCommas = Array.prototype.map.call(e, s => s.label).toString();
                          //     setSearchInput({ ...searchInput, student_skills: skillsSeparatedByCommas.split(",")})
                          //     }}
                          // options={skills}
                          styles={customStyles}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.searchLabels}
                          variant="h5"
                        >
                          Project Tech
                        </Typography>
                        <Select
                          AutoSize={true}
                          closeMenuOnSelect={true}
                          components={animatedComponents}
                          isMulti
                          isSearchable
                          className={classes.searchSelect}
                          //  onChange={(e) => {
                          //     e = e ? e : [];
                          //     var skillsSeparatedByCommas = Array.prototype.map.call(e, s => s.label).toString();
                          //     setSearchInput({ ...searchInput, student_skills: skillsSeparatedByCommas.split(",")})
                          //     }}
                          // options={skills}
                          styles={customStyles}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          className={classes.filterButton}
                          variant="contained"
                        >
                          Save Filters
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {/* END OF REFINED SEARCHED */}
          </div>
        </Grid>
      </div>
    </div>
  );
};
