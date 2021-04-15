import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Chip,
  Tooltip,
  IconButton,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { getConfig } from "../../authConfig";
import StudentsLists from "../../components/StudentPublic/StudentsList";

import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  searchBackground: {
    margin: "10px",
  },
  header: {
    textAlign: "center",
    fontSize: "35px",
    fontWeight: "bold",
    //color: "white",
    fontFamily: "Helvetica",
    marginBottom: theme.spacing(1.5),
  },
  SearchLabels: {
    fontFamily: "Helvetica",
    //color: "white",
  },
  SearchButton: {
    // marginLeft: "10px",
    width: "10vw",
  },
  search: {
    marginTop: theme.spacing(5.0),
    justifyContent: "center",
    display: "flex",
    alignItems: "center"
  },
  KeywordSearch: {
    backgroundColor: "white",
    borderRadius: "10px",
    // objectFit: "contain",
    maxWidth: "250px",
  },
  zipCode: {
    backgroundColor: "white",
    borderRadius: "10px",
    // objectFit: "contain",
    // width: 100,
    maxWidth: "250px",
  },
  MajorSearch: {
    width: 150,
    //borderRadius: "10px",
    height: 40,
  },
  DegreeSearch: {
    width: 150,
    objectFit: "contain",
    //borderRadius: "10px",
    height: 40,
  },
  SkillSearch: {
    // objectFit: "contain",
    borderRadius: "10px",
    maxWidth: "200px",
  },
  ButtonHelp: {
    padding: "5px",
  },
  grids: {
    marginLeft: theme.spacing(1.0),
    margin: theme.spacing(2),
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

export default function CompanySearch() {
  const [loading, setLoading] = useState(true);
  const [studentsList, setStudentsList] = useState([]);
  const [searchInput, setSearchInput] = useState({
    //This is the data from api
    zipcode: "",
    keywords: [],
    student_skills: [],
  });

  const handleClick = async () => {
    const data = {
      zip: searchInput.zipcode,
      keywords: searchInput.keywords,
      student_skills: searchInput.student_skills,
    };
    setLoading(true);
    axios
      .post("/student_profile/search", data, getConfig())
      .then((res) => {
        localStorage.setItem("search_history", JSON.stringify(data));
        setLoading(false);
        setStudentsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    if (e.key === "Enter") {
      setSearchInput({
        ...searchInput,
        keywords: [...searchInput.keywords, e.target.value],
      });
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const newList = searchInput.keywords.filter(
      (item) => item !== chipToDelete
    );
    setSearchInput({ ...searchInput, keywords: newList });
  };
  const classes = useStyles();
  //this is the animated component for the react-select library
  const animatedComponents = makeAnimated();
  const [skills, setSkills] = useState({});

  useEffect(() => {
    axios
      .get("/skill/", getConfig())
      .then((res) => {
        const data = res.data.map((skill) => {
          return { label: skill.skill_name, value: skill.id };
        });

        setSkills(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Restore seach to same data whecn going back.
    let data = {};
    if (JSON.parse(localStorage.getItem("search_history"))) {
      data = JSON.parse(localStorage.getItem("search_history"));
    } else {
      data = {
        zip: "",
        keywords: [],
        student_skills: [],
      };
    }
    axios
      .post("/student_profile/search", data, getConfig())
      .then((res) => {
        setLoading(false);
        setStudentsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item className={classes.searchBackground}>
            <Typography className={classes.header}>
              FutureStart Search
            </Typography>
          </Grid>
        </Grid>
        <ul className={classes.chipRoot}>
          {searchInput.keywords.map((data, index) => (
            <li key={index}>
              <Chip
                label={data}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            </li>
          ))}
        </ul>
      </div>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={9} sm={3} className={classes.grids}>
          <Typography className={classes.SearchLabels} variant="h6">
            Keyword
            <Tooltip
              title={
                <p style={{ fontSize: "13px" }}>
                  Press enter to save your keywords after you type them.
                  <br /> This will search the entire student description.
                </p>
              }
            >
              <IconButton className={classes.ButtonHelp}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <TextField
            className={classes.KeywordSearch}
            name="keywords"
            placeholder="Keyword"
            type="search"
            variant="outlined"
            size="small"
            onKeyDown={handleChange}
          />
        </Grid>
        <Grid item xs={9} sm={3} className={classes.grids}>
          <Typography className={classes.SearchLabels} variant="h6">
            Skills
          </Typography>
          <Select
            AutoSize={true}
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            isSearchable
            className={classes.SkillSearch}
            onChange={(e) => {
              e = e ? e : [];
              var skillsSeparatedByCommas = Array.prototype.map
                .call(e, (s) => s.label)
                .toString();
              if (skillsSeparatedByCommas.length > 0) {
                setSearchInput({
                  ...searchInput,
                  student_skills: skillsSeparatedByCommas.split(","),
                });
              } else {
                setSearchInput({
                  ...searchInput,
                  student_skills: [],
                });
              }
            }}
            options={skills}
            styles={customStyles}
          />
        </Grid>
        <Grid item xs={9} sm={3} className={classes.grids}>
          <Typography className={classes.SearchLabels} variant="h6">
            Zipcode
          </Typography>
          <TextField
            inputProps={{ maxLength: 5 }}
            className={classes.zipCode}
            name="zipCode"
            placeholder="zipcode"
            type="string"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setSearchInput({
                ...searchInput,
                zipcode: e.target.value,
              });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} md={2} sm={2}  className={classes.search}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.SearchButton}
            onClick={handleClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      
      <StudentsLists loading={loading} studentsList={studentsList} />
    </div>
  );
}
