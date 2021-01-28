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
    //backgroundColor: "rgba(200,16,46,1)",
    margin: "10px",
    borderRadius: "5px",
    flex: "column",
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
    marginLeft: "10px",
  },
  KeywordSearch: {
    backgroundColor: "white",
    borderRadius: "10px",
    objectFit: "contain",
    width: 180,
  },
  zipCode: {
    backgroundColor: "white",
    borderRadius: "10px",
    objectFit: "contain",
    width: 100,
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
    objectFit: "contain",
    borderRadius: "10px",
    width: 150,
  },
  chipRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
    listStyle: "none",
    margin: 1,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  ButtonHelp: {
    padding: "5px",
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
      <div className={classes.searchBackground}>
        <Grid>
          <Typography className={classes.header}>FutureStart Search</Typography>
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
        <Grid
          container
          id="master"
          direction="column"
          justify="space-between"
          spacing={2}
          alignItems="center">
          <Grid
            container
            id="first-left"
            justify="center"
            item
            xs={12}
            spacing={4}
            direction="row">
            <Grid item>
              <Typography className={classes.SearchLabels} variant="h6">
                Keyword
                <Tooltip
                  title={
                    <p style={{ fontSize: "13px" }}>
                      Press enter to save your keywords after you type them.
                      <br /> This will search the entire student description.
                    </p>
                  }>
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
            <Grid item>
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
            <Grid item>
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
                }}></TextField>
              <Button
                variant="contained"
                color="secondary"
                className={classes.SearchButton}
                onClick={handleClick}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <StudentsLists loading={loading} studentsList={studentsList} />
    </div>
  );
}
