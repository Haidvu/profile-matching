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

import ProjectsList from "../../components/CompanyPublic/ProjectsList";

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
    width: "85%",
    display: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: theme.spacing(3.0),
  },
  searchButton: {
    display: "flex-start",
    justifyContent: "center",
    margin: 10,
    color: "#b0102a",
    background: "white",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  searchSelect: {
    objectFit: "contain",
    borderRadius: "10px",
    width: 150,
    margin: theme.spacing(1.0),
    justifyContent: "center",
  },
  filterButton: {
    display: "flex-start",
    justifyContent: "center",
    marginTop: 25,
    background: "rgba(200,16,46,1)",
    color: "white",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "white",
      backgroundColor: "#b0102a",
    },
  },
  ASGrid: {
    display: "flex",
    justifyContent: "center",
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

const sample = [
  {
    company_name: "f",
    company_website: "f",
    company_contact_email: "f",
    project_id: 1,
    username_id: 1,
    project_name: "ff",
    project_description: "ff",
    project_type: "Frontend",
    project_tech: "",
    project_deadline: "2020-12-19",
    date_added: "2020-12-19",
  },
  {
    company_name: "f",
    company_website: "f",
    company_contact_email: "f",
    project_id: 2,
    username_id: 1,
    project_name: "project 2",
    project_description: "project 2",
    project_type: "",
    project_tech: "",
    project_deadline: "2020-12-19",
    date_added: "2020-12-19",
  },
  {
    company_name: "dfsgfdsg",
    company_website: "sdafsdaf",
    company_contact_email: "random@defsdf.com",
    project_id: 3,
    username_id: 3,
    project_name: "first project",
    project_description: "dfsadf",
    project_type: "Backend",
    project_tech: "Bootstrap,JavaScript,Python",
    project_deadline: "2020-12-30",
    date_added: "2020-12-20",
  },
  {
    company_name: "dfsgfdsg",
    company_website: "sdafsdaf",
    company_contact_email: "random@defsdf.com",
    project_id: 4,
    username_id: 3,
    project_name: "second project",
    project_description: "dsfdsaf",
    project_type: "Frontend",
    project_tech: "AWS,C++,JavaScript",
    project_deadline: "2020-12-25",
    date_added: "2020-12-20",
  },
  {
    company_name: "dfsgfdsg",
    company_website: "sdafsdaf",
    company_contact_email: "random@defsdf.com",
    project_id: 5,
    username_id: 3,
    project_name: "project three",
    project_description: "dsafdsa",
    project_type: "Frontend",
    project_tech: "AWS,GitHub",
    project_deadline: "2020-12-17",
    date_added: "2020-12-20",
  },
  {
    company_name: "Mayoor Shardha",
    company_website: "",
    company_contact_email: "mayoorshardha@gmail.com",
    project_id: 6,
    username_id: 4,
    project_name: "test",
    project_description: "test",
    project_type: "Frontend",
    project_tech: "Apache",
    project_deadline: "2020-12-22",
    date_added: "2020-12-21",
  },
  {
    company_name: "Muhammad Usman",
    company_website: "N/A",
    company_contact_email: "muhammadusman0200@gmail.com",
    project_id: 7,
    username_id: 6,
    project_name: "Beast",
    project_description: "Desription",
    project_type: "Frontend",
    project_tech: "Angular",
    project_deadline: "2020-12-22",
    date_added: "2020-12-21",
  },
];

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

  const [loading, setLoading] = useState(false);

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
                      className={classes.ASGrid}
                    >
                      <Grid item>
                        <Typography
                          className={classes.searchLabels}
                          variant="h6"
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
                          variant="h6"
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
                          variant="h6"
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
                          variant="h6"
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
                          variant="h6"
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
      <ProjectsList loading={loading} projects={sample} />
    </div>
  );
};
