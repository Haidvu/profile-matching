import React, { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

export default function AdminCompanyProjects() {

      // takes in the user input
    const [searchInput, setSearchInput] = useState({
        company_name: "",
    });
    const [noProjectsFound, setNoProjectsFound] = useState(false);
    const [projectList, setProjectList] = useState([]);
    // this is for the normal Search
    const handleClickSearch = () => {
        let data = {
            company_name: searchInput.company_name,
            industry_type: "",
            project_name: "",
            project_type: [],
            project_tech: [],
            keywords: [],
        };
        localStorage.setItem("search_history", JSON.stringify(data))
        axios
        .post(
            "http://18.213.74.196:8000/api/company_project/search",
            data,
            getConfig()
        )
        .then((res) => {
            setProjectList(res.data);
            if (projectList.length <= 0) {
            setNoProjectsFound(true);
            } else {
            setNoProjectsFound(false);
            }
        })
        .catch((err) => {
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

    const [companyNameList,setCompanyNameList] = useState([]);
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
            setCompanyNameList(data);
        })
        .catch((err) => {
            console.log(err);
        });
        //Restore seach to same data when going back.
        let data = {};
        if (JSON.parse(localStorage.getItem("search_history"))) {
            data = JSON.parse(localStorage.getItem("search_history"));
            axios
            .post(
                "http://18.213.74.196:8000/api/company_project/search",
                data,
                getConfig()
            )
            .then((res) => {
                setProjectList(res.data);
                if (projectList.length <= 0) {
                setNoProjectsFound(true);
                } else {
                setNoProjectsFound(false);
                }
            })
            .catch((err) => {
                setNoProjectsFound(true);
                console.log(err);
            });
        } 
    }, []);

    return(
        <div>
            I am here
        </div>
    );
};