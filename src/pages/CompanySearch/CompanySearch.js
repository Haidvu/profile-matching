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

import HelpIcon from '@material-ui/icons/Help';

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
  ButtonHelp:{
    padding: "5px"
  }
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
    major: "",
    degree_level: "",
    zipcode: "",
    keywords: [],
    student_skills: [],
  });

  const handleClick = async () => {
    const data = {
      major: searchInput.major,
      degree: searchInput.degree_level,
      zip: searchInput.zipcode,
      keywords: searchInput.keywords,
      student_skills: searchInput.student_skills,
    };
    setLoading(true);
    axios
      .post(
        "http://18.213.74.196:8000/api/student_profile/search",
        data,
        getConfig()
      )
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
      .get("http://18.213.74.196:8000/api/skill/", getConfig())
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
        major: "",
        degree: "",
        zip: "",
        keywords: [],
        student_skills: [],
      };
    }
    axios
      .post(
        "http://18.213.74.196:8000/api/student_profile/search",
        data,
        getConfig()
      )
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
                <Tooltip title={<p style={{ fontSize: "13px" }}>Press enter to save your keywords after you type them.<br/> This will search the entire student description.</p>}>
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
                Major
              </Typography>
              <select
                className={classes.MajorSearch}
                defaultValue={""}
                name="major"
                onChange={(e) => {
                  setSearchInput({ ...searchInput, major: e.target.value });
                }}>
                <option value="">Select Major</option>
                <optgroup label="Gerald D. Hines College of Architecture and Design">
                  <option value="Architecture">Architecture</option>
                  <option value="Environmental_Design">
                    Environmental Design
                  </option>
                  <option value="Industrial_Design">Industrial Design</option>
                  <option value="Interior_Architecture">
                    Interior Architecture
                  </option>
                </optgroup>
                <optgroup label="Kathrine G. McGovern College of the Arts">
                  <option value="Applied_Music">Applied Music</option>
                  <option value="Art">Art</option>
                  <option value="Art_History">Art History</option>
                  <option value="Dance">Dance</option>
                  <option value="Graphic_Design">Graphic Design</option>
                  <option value="Music">Music</option>
                  <option value="Painting">Painting</option>
                  <option value="Photography">Photography/Digital Media</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Theatre">Theatre</option>
                </optgroup>
                <optgroup label="C. T. Bauer College of Business">
                  <option value="Accounting">Accounting</option>
                  <option value="Entrepreneurship">Entrepreneurship</option>
                  <option value="Finance">Finance</option>
                  <option value="Management">Management</option>
                  <option value="Management_Information_Systems">
                    Management Information Systems
                  </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Suppy_Chain_Management">
                    Suppy Chain Management
                  </option>
                </optgroup>
                <optgroup label="College of Education">
                  <option value="Health">Health</option>
                  <option value="Human_Development_and_Family_Studies">
                    Human Development and Family Studies
                  </option>
                  <option value="Teaching_and_Learning">
                    Teaching and Learning
                  </option>
                </optgroup>
                <optgroup label="Cullen College of Engineering">
                  <option value="Biomedical_Engineering">
                    Biomedical Engineering
                  </option>

                  <option value="Chemical_Engineering">
                    Chemical Engineering
                  </option>

                  <option value="Civil_Engineering">Civil Engineering</option>

                  <option value="Computer_Engineering">
                    Computer Engineering
                  </option>

                  <option value="Computer_Engineering_and_Analytics">
                    Computer Engineering and Analytics
                  </option>
                  <option value="Construction_Engineering">
                    Construction Engineering
                  </option>
                  <option value="Electrical_Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Industrial_Engineering">
                    Industrial Engineering
                  </option>
                  <option value="Mechanical_Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Petroleum_Engineering">
                    Petroleum Engineering
                  </option>
                  <option value="Systems_Engineering">
                    Systems Engineering
                  </option>
                </optgroup>
                <optgroup label="Conrad N. Hilton College of Hotel and Restaurant Management">
                  <option value="Hotel_and_Restaurant_Management">
                    Hotel and Restaurant Management
                  </option>
                </optgroup>
                <optgroup label="College of Liberal Arts and Social Sciences">
                  <option value="African_American_Studies">
                    African American Studies
                  </option>
                  <option value="American_Sign_Language_Interpreting">
                    American Sign Language Interpreting
                  </option>
                  <option value="Anthropology">Anthropology</option>
                  <option value="Chinese_Studies">Chinese Studies</option>
                  <option value="Communication_Sciences_and_Disorders">
                    Communication Sciences and Disorders
                  </option>
                  <option value="Communication_Studies">
                    Communication Studies
                  </option>
                  <option value="Economics">Economics</option>
                  <option value="English">English</option>
                  <option value="Exercise_Science">Exercise Science</option>
                  <option value="Fitness_and_Sports">Fitness and Sports</option>

                  <option value="French">French</option>
                  <option value="Health_Communication">
                    Health Communication
                  </option>
                  <option value="History">History</option>
                  <option value="Human_Nutrition_and_Foods">
                    Human Nutrition and Foods
                  </option>
                  <option value="Journalism">Journalism</option>
                  <option value="Liberal_Studies">Liberal Studies</option>
                  <option value="Media_Production">Media Production</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Religious_Studies">Religious Studies</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Sports_Administration">
                    Sports Administration
                  </option>
                  <option value="Strategic_Communication">
                    Strategic Communication
                  </option>

                  <option value="Women’s,_Gender,_and_Sexuality_Studies">
                    Women’s, Gender, and Sexuality Studies
                  </option>
                  <option value="World_Cultures_and_Literatures">
                    World Cultures and Literatures
                  </option>
                </optgroup>
                <optgroup label="College of Natural Sciences and Mathematics">
                  <option value="Biochemical_and_Biophysical_Sciences">
                    Biochemical and Biophysical Sciences
                  </option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer_Science">Computer Science</option>
                  <option value="Earth_Science">Earth Science</option>
                  <option value="Environmental_Sciences">
                    Environmental Sciences
                  </option>
                  <option value="Geology">Geology</option>
                  <option value="Geophysics">Geophysics</option>
                  <option value="Honors_Biomedical_Sciences">
                    Honors Biomedical Sciences
                  </option>
                  <option value="Mathematical_Biology">
                    Mathematical Biology
                  </option>
                  <option value="Mathematics">Mathematics</option>

                  <option value="Physics">Physics</option>
                </optgroup>
                <optgroup label="College of Nursing">
                  <option value="Pre-Nursing">Pre-Nursing</option>
                  <option value="Nursing,_BSN_(RN-BSN)">
                    Nursing, BSN (RN-BSN)
                  </option>
                  <option value="Nursing,_BSN_(Second_Degree)">
                    Nursing, BSN (Second Degree)
                  </option>
                </optgroup>
                <optgroup label="College of Technology">
                  <option value="Biotechnology">Biotechnology</option>

                  <option value="Computer_Engineering_Technology">
                    Computer Engineering Technology
                  </option>
                  <option value="Computer_Information_Systems">
                    Computer Information Systems
                  </option>
                  <option value="Construction_Management">
                    Construction Management
                  </option>
                  <option value="Digital_Media">Digital Media</option>
                  <option value="Electrical_Power_Engineering_Technology">
                    Electrical Power Engineering Technology
                  </option>
                  <option value="Human_Resources_Development">
                    Human Resources Development
                  </option>
                  <option value="Mechanical_Engineering_Technology">
                    Mechanical Engineering Technology
                  </option>
                  <option value="Retailing_and_Consumer_Science">
                    Retailing and Consumer Science{" "}
                  </option>
                  <option value="Supply_Chain_and_Logistics_Technology">
                    Supply Chain and Logistics Technology
                  </option>
                  <option value="Technology_Leadership_and_Innovation_Management ">
                    Technology Leadership and Innovation Management{" "}
                  </option>
                </optgroup>
                <optgroup label="Pre-Professional Tracks">
                  <option value="Pre-Dentistry">Pre-Dentistry</option>
                  <option value="Pre-Law">Pre-Law</option>
                  <option value="Pre-Medicine">Pre-Medicine</option>
                  <option value="Pre-Optometry">Pre-Optometry</option>
                  <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                  <option value="Pre-Physical_Therapy">
                    Pre-Physical Therapy
                  </option>
                  <option value="Pre-Veterinary_Medicine">
                    Pre-Veterinary Medicine
                  </option>
                </optgroup>
              </select>
            </Grid>
            <Grid item>
              <Typography className={classes.SearchLabels} variant="h6">
                Degree Type
              </Typography>
              <select
                defaultValue={""}
                name="degree_level"
                onChange={(e) => {
                  setSearchInput({
                    ...searchInput,
                    degree_level: e.target.value,
                  });
                }}
                className={classes.DegreeSearch}>
                <option value="">Select Degree type</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
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
      <div>
        <Grid>
          <StudentsLists loading={loading} studentsList={studentsList} />
        </Grid>
      </div>
    </div>
  );
}
