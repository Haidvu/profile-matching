import DeckGL from '@deck.gl/react';
import {IconLayer} from '@deck.gl/layers';
import axios from 'axios';
import React,{useEffect} from "react";
import { getConfig } from '../../authConfig';
import {StaticMap} from 'react-map-gl';
import {MapView} from '@deck.gl/core';

 /*CompanyData = () => {  
  const companyProfiles = [];
  

  const getAddress = (address) => {
  if (address !== "") {
    const res = address.split("|");
    return `${res[0]}, ${res[1]}, ${res[2]} `;
  }
    return "";
  };

  const TOKEN = 'pk.eyJ1Ijoicm9oaXRzaGFyZGhhIiwiYSI6ImNrajIxcWVxaTIyZWgycXF0NWwxMG9wMTMifQ.NuOk3LeRP5b5Gvtso3MFrg';
  
  useEffect(() => {
    axios.get("http://18.213.74.196:8000/api/company_profile/",
    getConfig())
    .then(res => {
      let id =-1;
      // eslint-disable-next-line array-callback-return
      res.data.map((res) => {
          let address = getAddress(res.company_address) + res.company_zip;
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${TOKEN}`)
            .then((response) => {
              id += 1;
              companyProfiles.push({
                coordinates: response.data.features[0].geometry.coordinates,
                id: id,
                name: res.company_name,
                description: res.company_description,
                phone: res.company_phone_no,
                website: res.company_website,
                contact_email: res.company_contact_email,
                address: getAddress(res.company_address) + res.company_zip,
              });
            });
        })
        console.log("data from company company data",companyProfiles);
    })
    .catch(err => {
      console.log(err)
    });       
  }, [])

  return companyProfiles;
};

export default CompanyData;*/