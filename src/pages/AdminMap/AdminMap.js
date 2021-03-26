/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useEffect,useRef } from "react";
import mapboxgl from "!mapbox-gl";
import axios from "axios";
import { getConfig } from "../../authConfig";
import { makeStyles } from "@material-ui/core/styles";
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const useStyles = makeStyles((theme) => ({
  mapContainer:{
    position: "absolute",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    }
}))

export default function AdminMap(){
    
    //access token 
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY29uc3VsdGluZ2NsaW5pY3NlcnZpY2VzIiwiYSI6ImNrbG4zdndrZzBmNXkyd256bTkzajlkNmcifQ.QDoyQPnSgSGKazCEN_I4Vg";
    
    const node = useRef(null);
    const classes = useStyles();
    
    const initializeMap = () => {
      return new mapboxgl.Map({
        container: node.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-95.5698, 29.7604],
        zoom: 8
      });
    }

    // create markups for each company
    const createMarkups = (marker) =>{
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      return new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
          .setHTML(
            '<h3>' + marker.properties.name + '</h3>' +
            '<p>' + marker.properties.description + '</p>' +
            '<p>' + marker.properties.website + '</p>' +
            '<p>' + marker.properties.contact_email + '</p>' +
            '<p>' + marker.properties.address + '</p>'
        ))
    }

    //array holding company data
    const [companyAddress, setCompanyAddress] = useState([]);
    //create company address string
    const getAddress = (address) => {
        if (address !== "") {
          const res = address.split("|");
          return `${res[0]}, ${res[1]}, ${res[2]} `;
        }
        return "";
      };
    
    useEffect(() => {
      //get all companies description and addresses
      axios
          .get("/company_profile/", getConfig())
          .then((res) => {
            let companyData = [];
            res.data.map((res) => {
                let address = getAddress(res.company_address) + res.company_zip;
                companyData.push({
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      parseFloat(res.company_longitude),
                      parseFloat(res.company_latitude),
                    ]
                  },
                  properties: {
                    name: res.company_name,
                    description: res.company_description,
                    website: res.company_website,
                    contact_email: res.company_contact_email,
                    address: address
                  }
                })
            });
            setCompanyAddress(companyData);
            })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      useEffect(()=>{
        //map object with initial position
        const map = initializeMap()
        // add markers to map
        companyAddress.forEach(function(marker) {
          //create markups and add to the map
          createMarkups(marker)
          .addTo(map);
        });  
      },[companyAddress]);

      return(
        <div>
          <div className={classes.mapContainer} ref={node} />
        </div>
      );
};