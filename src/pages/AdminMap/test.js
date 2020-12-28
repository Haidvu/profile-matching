import DeckGL from '@deck.gl/react';
import {IconLayer} from '@deck.gl/layers';
import axios from 'axios';
import React,{useEffect, useState, useContext} from "react";
import { getConfig } from '../../authConfig';
import {StaticMap} from 'react-map-gl';
import {MapView} from '@deck.gl/core';

import { DataContext } from "../../contexts/dataContext";



import { ContactSupportOutlined } from '@material-ui/icons';

import locationIconAtlas from "../../assets/location-icon-atlas.png";
import locationIconMapping from "../../assets/location-icon-mapping.json";
// Source data CSV
//const DATA_URL =
 // 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json'; // eslint-disable-line

 const DATA_URL = [
  {"coordinates":[-95.653116, 29.6454],"address": "123 Donut Street, Houston, TX 77002","contact_email": "jerel1@abc.com","description": "Social Business Donut Shop","id": "0","name": "Jerel's Donut's","phone": "8329999999","website": "www.jerelsdonuts.com"},
    {"coordinates":[-96.8924242, 32.9294557],"name":"Almahata Sitta","class":"Ureilite-an","mass":"3950","year":2008},
  {"coordinates":[-99.31, 29.32],"name":"Ash Creek","class":"L6","mass":"9500","year":2009},
  {"coordinates":[-95.642275, 29.658143],"name":"Bassikounou","class":"H5","mass":"29560","year":2006},
  {"coordinates":[-95.642275, 29.658143],"name":"Battle Mountain","class":"L6","mass":"2900","year":2012},
  {"coordinates":[-95.684012, 29.656758],"name":"Benguerir","class":"LL6","mass":"25000","year":2004},
  {"coordinates":[-96.762149, 33.179541],"name":"Benguerir","class":"LL6","mass":"25000","year":2004}];


  const DATA_URL2 = [
    {
      address: "123 Donut Street, Houston, TX 77002",
      contact_email: "jerel1@abc.com",
      description: "Social Business Donut Shop",
      coordinates:[-95.653116, 29.6454],
      id: "0",name: "Jerel's Donut's",
      phone: "8329999999",
      website: "www.jerelsdonuts.com"}];


const MAP_VIEW = new MapView({repeat: true});
const INITIAL_VIEW_STATE = {
  longitude: -95.5698,
  latitude: 29.7604,
  zoom: 8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

//const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

/* eslint-disable react/no-deprecated */
export default function App({
  data = DATA_URL2,
  iconMapping = locationIconMapping,
  iconAtlas = locationIconAtlas,
  mapStyle = MAP_STYLE
}) {


  const [hoverInfo, setHoverInfo] = useState({});

  const hideTooltip = () => {
    setHoverInfo({});
  };
  const expandTooltip = info => {
    if (info.picked) {
      setHoverInfo(info);
    } else {
      setHoverInfo({});
    }
  };

 console.log("data before", data);

  const layerProps = {
    data,
    pickable: true,
    getPosition: d => d.coordinates,
    iconAtlas,
    iconMapping,
    onHover: !hoverInfo.objects && setHoverInfo
  };
console.log(layerProps.data);


  const layer = new IconLayer({
        ...layerProps,
        id: 'icon',
        getIcon: d => 'marker',
        sizeUnits: 'meters',
        sizeScale: 2000,
        sizeMinPixels: 30
      });

      const TOKEN = 'pk.eyJ1Ijoicm9oaXRzaGFyZGhhIiwiYSI6ImNrajIxcWVxaTIyZWgycXF0NWwxMG9wMTMifQ.NuOk3LeRP5b5Gvtso3MFrg';

      const getAddress = (address) => {
        if (address !== "") {
          const res = address.split("|");
          return `${res[0]}, ${res[1]}, ${res[2]} `;
        }
          return "";
        };

  /*    useEffect(() => {
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
                  data.push({
                    coordinates: response.data.features[0].geometry.coordinates,
                    name: res.company_name,
                    description: res.company_description,
                    phone: res.company_phone_no,
                    website: res.company_website,
                    contact_email: res.company_contact_email,
                    address: getAddress(res.company_address) + res.company_zip,
                  });
                });
            })
         // console.log("data useEffect",data)
           
        })
        .catch(err => {
          console.log(err)
        });       
      }, [data])*/

  return ( 
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={{dragRotate: false}}
      onViewStateChange={hideTooltip}
      onClick={expandTooltip}
      getTooltip={({object}) => object && `${object.name}\n${object.address}`}
    >
      <StaticMap reuseMaps mapStyle={mapStyle} mapboxApiAccessToken={TOKEN} preventStyleDiffing={true} />

    </DeckGL> 
  );
}

