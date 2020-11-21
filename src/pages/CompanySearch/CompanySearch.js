import React,{useState, useEffect} from "react";
import Select from 'react-select';
import {Grid, Box, TextField, Button, Chip} from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles";
import makeAnimated from 'react-select/animated';
import StudentsLists from '../../components/StudentPublic/StudentsList';


const useStyles = makeStyles((theme) => ({
    root:{
        background: "rgba(200,16,46,1)",
        margin:"1%",
        color:"white",
        borderRadius:"10px",
    },
    Title:{
        textAlign: 'center',
        fontFamily:"Helvetica",
        fontSize:"xx-large"
    },
    SearchLabels:{
        fontFamily:"Helvetica",
        fontWeight:"bold"
    },
    SearchButton:{
        backgroundColor:"#1976d2"
    },
    KeywordSearch:{
        backgroundColor:"white",
        borderRadius:"10px",
        objectFit:"contain",
    },
    MajorSearch:{
        width:"150px",
        objectFit:"contain",
        borderRadius:"10px",
        height:"6.5vh"
    },
    DegreeSearch:{
        objectFit:"contain",
        borderRadius:"10px",
        width:"150px",
        height:"6.5vh"
    },
    SkillSearch:{
        objectFit:"contain",
        borderRadius:"10px",
    },
    chipRoot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(1),
        margin: 1,
      },
    chip: {
        margin: theme.spacing(0.5),
    },
    Search:{
        justifyContent: 'center',
    }
}));
export default function CompanySearch(){

    const [searchInput, setSearchInput] = useState({ //This is the data from api
        major: null,
        degree: null,
        keyword:[],
        student_skills:[]
      })
    const handleClick = () =>{
    }
    const handleChange = (e) =>{
        if (e.key === 'Enter') {
            setSearchInput({...searchInput, 
                keyword:[...searchInput.keyword, e.target.value]});         
        }
    }

    useEffect(() => {
      }, [searchInput]);

    const handleDelete = (chipToDelete) => () => {
        const newList = searchInput.keyword.filter(item => item !== chipToDelete);
        setSearchInput({...searchInput, keyword: newList});
    };
    const classes = useStyles();
    //this is the animated component for the react-select library
    const animatedComponents = makeAnimated();
    const options = [{label:'C++', value:0}, {label:'Java', value:1}, {label:'C#', value:2}]
    
  return <div> 
        <Grid className={classes.root}>
            <Grid>
                <Box className={classes.Title} variant="h4" >Future Start Search</Box>
                <Grid item className={classes.chipRoot}>
                    {searchInput.keyword.map((data,index) => (
                        <li key={index}>
                            <Chip
                            label={data}
                            onDelete={handleDelete(data)}
                            className={classes.chip}
                            />
                        </li>
                    ))}
                </Grid>
            </Grid>
            <Grid className={classes.Search} container spacing={2}>
                <Grid item xs={2}>
                    <Box className={classes.SearchLabels} variant="h8" >
                        Keyword
                    </Box>
                    <TextField className={classes.KeywordSearch} name="keyword" label="Keyword" type="search" variant="outlined" size="small" onKeyDown={handleChange}/>
                </Grid>
                <Grid item xs={2}>
                    <Box className={classes.SearchLabels} variant="h8" >Major</Box>
                    <select className={classes.MajorSearch} defaultValue={""} name="major" onChange={(e)=>{setSearchInput({...searchInput,major:e.target.value})}}>  
                        <option value="">Select an option</option>
                        <optgroup label="Gerald D. Hines College of Architecture and Design">
                        <option value="Architecture">Architecture</option>
                        <option value="Environmental_Design">Environmental Design</option>
                        <option value="Industrial_Design">Industrial Design</option>
                        <option value="Interior_Architecture">Interior Architecture</option>
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
                        <option value="Management_Information_Systems">Management Information Systems</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Suppy_Chain_Management">Suppy Chain Management</option>
                    </optgroup>
                        <optgroup label="College of Education">
                            <option value="Health">Health</option>
                            <option value="Human_Development_and_Family_Studies">Human Development and Family Studies</option>
                            <option value="Teaching_and_Learning">Teaching and Learning</option>
                        </optgroup>
                        <optgroup label="Cullen College of Engineering">
                        <option value="Biomedical_Engineering">Biomedical Engineering</option>

                        <option value="Chemical_Engineering">Chemical Engineering</option>

                        <option value="Civil_Engineering">Civil Engineering</option>

                        <option value="Computer_Engineering">Computer Engineering</option>

                        <option value="Computer_Engineering_and_Analytics">Computer Engineering and Analytics</option>
                        <option value="Construction_Engineering">Construction Engineering</option>
                        <option value="Electrical_Engineering">Electrical Engineering</option>
                        <option value="Industrial_Engineering">Industrial Engineering</option>
                        <option value="Mechanical_Engineering">Mechanical Engineering</option>
                        <option value="Petroleum_Engineering">Petroleum Engineering</option>
                        <option value="Systems_Engineering">Systems Engineering</option>
                    </optgroup>
                        <optgroup label="Conrad N. Hilton College of Hotel and Restaurant Management">

                        <option value="Hotel_and_Restaurant_Management">Hotel and Restaurant Management</option>
                    </optgroup>
                        <optgroup label="College of Liberal Arts and Social Sciences">

                        <option value="African_American_Studies">African American Studies</option>
                        <option value="American_Sign_Language_Interpreting">American Sign Language Interpreting</option>
                        <option value="Anthropology">Anthropology</option>
                        <option value="Chinese_Studies">Chinese Studies</option>
                        <option value="Communication_Sciences_and_Disorders">Communication Sciences and Disorders</option>
                        <option value="Communication_Studies">Communication Studies</option>
                        <option value="Economics">Economics</option>
                        <option value="English">English</option>
                        <option value="Exercise_Science">Exercise Science</option>
                        <option value="Fitness_and_Sports">Fitness and Sports</option>

                        <option value="French">French</option>
                        <option value="Health_Communication">Health Communication</option>
                        <option value="History">History</option>
                        <option value="Human_Nutrition_and_Foods">Human Nutrition and Foods</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Liberal_Studies">Liberal Studies</option>
                        <option value="Media_Production">Media Production</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Political Science">Political Science</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Religious_Studies">Religious Studies</option>
                        <option value="Sociology">Sociology</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Sports_Administration">Sports Administration</option>
                        <option value="Strategic_Communication">Strategic Communication</option>

                        <option value="Women’s,_Gender,_and_Sexuality_Studies">Women’s, Gender, and Sexuality Studies</option>
                        <option value="World_Cultures_and_Literatures">World Cultures and Literatures</option>
                    </optgroup>
                        <optgroup label="College of Natural Sciences and Mathematics">

                        <option value="Biochemical_and_Biophysical_Sciences">Biochemical and Biophysical Sciences</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Computer_Science">Computer Science</option>
                        <option value="Earth_Science">Earth Science</option>
                        <option value="Environmental_Sciences">Environmental Sciences</option>
                        <option value="Geology">Geology</option>
                        <option value="Geophysics">Geophysics</option>
                        <option value="Honors_Biomedical_Sciences">Honors Biomedical Sciences</option>
                        <option value="Mathematical_Biology">Mathematical Biology</option>
                        <option value="Mathematics">Mathematics</option>

                        <option value="Physics">Physics</option>
                    </optgroup>
                        <optgroup label="College of Nursing">

                        <option value="Pre-Nursing">Pre-Nursing</option>
                        <option value="Nursing,_BSN_(RN-BSN)">Nursing, BSN (RN-BSN)</option>
                        <option value="Nursing,_BSN_(Second_Degree)">Nursing, BSN (Second Degree)</option>
                    </optgroup>
                        <optgroup label="College of Technology">

                        <option value="Biotechnology">Biotechnology</option>
                        
                        <option value="Computer_Engineering_Technology">Computer Engineering Technology</option>
                        <option value="Computer_Information_Systems">Computer Information Systems</option>
                        <option value="Construction_Management">Construction Management</option>
                        <option value="Digital_Media">Digital Media</option>
                        <option value="Electrical_Power_Engineering_Technology">Electrical Power Engineering Technology</option>
                        <option value="Human_Resources_Development">Human Resources Development</option>
                        <option value="Mechanical_Engineering_Technology">Mechanical Engineering Technology</option>
                        <option value="Retailing_and_Consumer_Science">Retailing and Consumer Science </option>
                        <option value="Supply_Chain_and_Logistics_Technology">Supply Chain and Logistics Technology</option>
                        <option value="Technology_Leadership_and_Innovation_Management ">Technology Leadership and Innovation Management </option>
                    </optgroup>
                        <optgroup label="Pre-Professional Tracks">
                        
                            <option value="Pre-Dentistry">Pre-Dentistry</option>
                            <option value="Pre-Law">Pre-Law</option>
                            <option value="Pre-Medicine">Pre-Medicine</option>
                            <option value="Pre-Optometry">Pre-Optometry</option>
                            <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                            <option value="Pre-Physical_Therapy">Pre-Physical Therapy</option>
                            <option value="Pre-Veterinary_Medicine">Pre-Veterinary Medicine</option>
                    </optgroup>
                </select>
                </Grid>
                <Grid item xs={2}>
                    <Box className={classes.SearchLabels} variant="h8" >Degree Type</Box>
                    <select defaultValue={""} name="degree" onChange={(e)=>{setSearchInput({...searchInput,degree:e.target.value})}} className={classes.DegreeSearch}>
                        <option value="">Select an option</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                    </select> 
                </Grid>
                <Grid item xs={2}>
                    <Box className={classes.SearchLabels} variant="h8" >Technology and Skills</Box>
                    <Select
                        AutoSize={true}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti
                        isSearchable
                        className={classes.SkillSearch}
                        onChange={(e)=>{setSearchInput({...searchInput,student_skills:e})}}
                        options={options}
                    />
                </Grid>
                <Grid item xs={2}>
                    <br/>
                    <Button className={classes.SearchButton} variant="contained" onClick={handleClick}>Search</Button>
                </Grid>
            </Grid> 
        </Grid>
        <StudentsLists/>
    </div>;
};

