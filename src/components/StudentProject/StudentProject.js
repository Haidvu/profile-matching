
import React, { useEffect, useState, useContext } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import axios from 'axios';
import { getConfig } from '../../authConfig';
import WebRoundedIcon from '@material-ui/icons/WebRounded';

import { DataContext } from "../../contexts/dataContext";


const useStyles = makeStyles((theme) => ({
  verticalElementTitle: {
    margin: 0,
  },
  verticalElementSubtitle: {
    margin: 0,
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(2, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));


function StudentProject() {
  const classes = useStyles();

  const [projects, setProjects] = useState([])

  const { data } = useContext(DataContext);

  const { profile } = data;

 console.log('profile',profile);
  // const [editProject, setEditProject] = useState({
  //   project_name: ""
  // }) NEED TO FINISH THIS API

  useEffect(() => {
    console.log(getConfig())
    axios.post("http://18.213.74.196:8000/api/student_project/list_by_student",
    
      {
        student_id: 210515
      }
    ,getConfig()).then(res => {
        console.log(res.data)
        setProjects(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])


  // const addProject = () => {
  //   setProjects([...projects, editProject])
  // } NEED TO FINISH THIS API


  return (
    <div>

      <VerticalTimeline layout={'1-column-left'}>
        {projects.map((project, index) => <VerticalTimelineElement
          className={classes.IconStyle}
          iconStyle={{ background: '#C8102E', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid #C8102E' }}
          date={project.project_start_date}
          key={index}
          {...console.log(project)}
          icon={<WebRoundedIcon />
         
          }
        >

          <h3 className={classes.verticalElementTitle}>{project.project_name}</h3>
          <h4 className={classes.verticalElementSubtitle}>{project.project_role}</h4>
          <Chip label={project.project_tech} />
          <Chip label={project.project_tech} />
          <p>
            {project.project_description}
            </p>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              View source link
              <br />
              <a href={`${project.project_link}`} className={classes.link}>
                {project.project_link}
              </a>
            </Typography>
          </div>
        </VerticalTimelineElement>
        )}
      </VerticalTimeline>
      
    </div>
  )
}

export default StudentProject;

