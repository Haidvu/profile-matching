import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import FilterListIcon from "@material-ui/icons/FilterList";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ProjectsList from "../../components/CompanyPublic/ProjectsList";
import axios from "axios";

import { getConfig } from "../../authConfig";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  keywordGrid: {
    width: "100%",
  },
  keywordSearch: {
    backgroundColor: "white",
    borderRadius: "10px",
    // objectFit:"contain",
    width: "95%",
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
    color: "red",
    display: "center",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    margin: "0 auto",
    paddingBottom: 5,
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "red",
      backgroundColor: "#ebebeb",
    },
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
    width: "100%",
    margin: theme.spacing(1.0),
    justifyContent: "center",
    '& > div > div > div': { width: "auto !important" },
  },
  filterButton: {
    display: "flex-end",
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
    width: "100%"
  }),
  multiValue: (provided) => ({
    ...provided,
    width: "100%"
  }),
  ValueContainer: (provided) => ({
    ...provided,
    width: "100%"
  }),
};

export const StudentSearch = () => {
  // these 3 are for the ProjectsList component on the bottom
  const [loading, setLoading] = useState(false);
  const [noProjectsFound, setNoProjectsFound] = useState(false);
  const [projectList, setProjectList] = useState([]);

  // takes in the user input
  const [searchInput, setSearchInput] = useState({
    //This is the data from api
    company_name: "",
    industry_type: "",
    project_name: "",
    project_type: [],
    project_tech: [],
    keywords: [],
  });

  // this is for the normal Search
  const handleClickSearch = () => {
    const data = {
      company_name: searchInput.company_name,
      industry_type: searchInput.industry_type,
      project_name: searchInput.project_name,
      project_type: searchInput.project_type,
      project_tech: searchInput.project_tech,
      keywords: searchInput.keywords,
    };
    setLoading(true);
    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/search",
        data,
        getConfig()
      )
      .then((res) => {
        setLoading(false);
        setProjectList(res.data);
        if (res.data.length === 0) {
          setNoProjectsFound(true);
        } else {
          setNoProjectsFound(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setNoProjectsFound(true);
        console.log(err);
      });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "http://18.213.74.196:8000/api/company_project/search",
        searchInput,
        getConfig()
      )
      .then((res) => {
        setLoading(false);
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();

  //these 2 are for the Accordion dropdown for Advanced Search
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //this is the animated component for the react-select library
  const animatedComponents = makeAnimated();

  //api for select Company Name
  const [companyName, setCompanyName] = useState({});
  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/company_profile/list_company_name",
        getConfig()
      )
      .then((res) => {
        const data = res.data.map((compName) => {
          return { label: compName.company_name };
        });

        setCompanyName(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //api for select IndustryType
  const [industryType, setIndustryType] = useState({});
  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/company_profile/list_industry_type",
        getConfig()
      )
      .then((res) => {
        const data = res.data.industry_type.map((item, index) => {
          return {
            label: item,
            value: index,
          };
        });
        setIndustryType(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //api for select ProjectName
  const [projectName, setProjectName] = useState({});
  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/company_project/list_project_name",
        getConfig()
      )
      .then((res) => {
        const data = res.data.map((projName) => {
          return { label: projName.project_name };
        });

        setProjectName(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //api for select ProjectType
  const [projectType, setProjectType] = useState({});
  useEffect(() => {
    axios
      .get(
        "http://18.213.74.196:8000/api/company_project/list_project_type",
        getConfig()
      )
      .then((res) => {
        const data = res.data.project_type.map((item, index) => {
          return {
            label: item,
            value: index,
          };
        });

        setProjectType(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //api for select ProjectTech
  const [projectTech, setProjectTech] = useState({});
  useEffect(() => {
    axios
      .get("http://18.213.74.196:8000/api/skill/", getConfig())
      .then((res) => {
        const data = res.data.map((skill) => {
          return { label: skill.skill_name, value: skill.id };
        });

        setProjectTech(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className={classes.searchBackground}>
        <Grid>
          <Typography className={classes.header}>FutureStart Search</Typography>
        </Grid>
        <Grid>
          <Grid
            container
            id="first-left"
            item
            xs={12}
            spacing={4}
            direction="row"
          >
            <Grid item className={classes.keywordGrid}>
              <OutlinedInput
                className={classes.keywordSearch}
                placeholder="Search company projects using keyword(s)"
                onChange={(e) => {
                  setSearchInput({ ...searchInput, keywords: e.target.value });
                }}
                onKeyPress={handleKeypress}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      size="large"
                      className={classes.searchButton}
                      fullWidth={true}
                      onClick={handleClickSearch}
                    >
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                }
              />
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
                      // container
                      // id="first-left"
                      // item
                      // xs={12}
                      // spacing={1}
                      // direction="row"
                      // className={classes.ASGrid}
                      container
                      id="first-left"
                      item
                      xs={12}
                      spacing={1}
                      justify="space-evenly"
                      direction="column"
                      alignItems="stretch"
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
                          onChange={(e) => {
                            e = e ? e : [];
                            var compNameSeparatedByCommas = Array.prototype.map
                              .call(e, (s) => s.label)
                              .toString();
                            setSearchInput({
                              ...searchInput,
                              company_name: compNameSeparatedByCommas,
                            });
                          }}
                          options={companyName}
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
                          onChange={(e) => {
                            e = e ? e : [];
                            var industryTypeSeparatedByCommas = Array.prototype.map
                              .call(e, (s) => s.label)
                              .toString();
                            setSearchInput({
                              ...searchInput,
                              industry_type: industryTypeSeparatedByCommas,
                            });
                          }}
                          options={industryType}
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
                          onChange={(e) => {
                            e = e ? e : [];
                            var projectNameSeparatedByCommas = Array.prototype.map
                              .call(e, (s) => s.label)
                              .toString();
                            setSearchInput({
                              ...searchInput,
                              project_name: projectNameSeparatedByCommas,
                            });
                          }}
                          options={projectName}
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
                          onChange={(e) => {
                            e = e ? e : [];
                            var projectTypeSeparatedByCommas = Array.prototype.map
                              .call(e, (s) => s.label)
                              .toString();
                            setSearchInput({
                              ...searchInput,
                              project_type: projectTypeSeparatedByCommas.split(
                                ","
                              ),
                            });
                          }}
                          options={projectType}
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
                          onChange={(e) => {
                            e = e ? e : [];
                            var skillsSeparatedByCommas = Array.prototype.map
                              .call(e, (s) => s.label)
                              .toString();
                            setSearchInput({
                              ...searchInput,
                              project_tech: skillsSeparatedByCommas.split(","),
                            });
                          }}
                          options={projectTech}
                          styles={customStyles}
                        />
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
      <ProjectsList
        loading={loading}
        projects={projectList}
        noProjectsFound={noProjectsFound}
      />
    </div>
  );
};
