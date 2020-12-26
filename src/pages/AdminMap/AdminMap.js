import DeckGL from '@deck.gl/react';
import {IconLayer} from '@deck.gl/layers';
import axios from 'axios';
import React,{useEffect} from "react";
import { getConfig } from '../../authConfig';
import {StaticMap} from 'react-map-gl';
import {MapView} from '@deck.gl/core';

function AdminMap() {  
  const companyProfiles = [];
  const MAP_VIEW = new MapView({repeat: true});
  const INITIAL_VIEW_STATE = {
    longitude: -95,
    latitude: 40,
    zoom: 3,
    pitch: 0,
    bearing: 0
  };
  const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const TOKEN = 'pk.eyJ1Ijoicm9oaXRzaGFyZGhhIiwiYSI6ImNrajIxcWVxaTIyZWgycXF0NWwxMG9wMTMifQ.NuOk3LeRP5b5Gvtso3MFrg';
  const layer = new IconLayer({
    id: 'icon-layer',
    companyProfiles,
    pickable: true,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    getIcon: d => 'marker',
    getPosition: d => d.coordinates,
    getSize: d => 5,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: {
      marker: {
        x: 0,
        y: 0,
        width: 128,
        height: 128,
        anchorY: 128,
        mask: true
      }
    },
    sizeUnits: 'meters',
    sizeScale: 2000,
    sizeMinPixels: 6
  });

  const getAddress = (address) => {
  if (address !== "") {
    const res = address.split("|");
    return `${res[0]}, ${res[1]}, ${res[2]} `;
  }
    return "";
  };
  
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
        console.log(companyProfiles);
    })
    .catch(err => {
      console.log(err)
    });       
  }, [companyProfiles])

  return (
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      // onViewStateChange={hideTooltip}
      // onClick={expandTooltip}
    >
      <StaticMap mapboxApiAccessToken={TOKEN} reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
{/* 
      {renderTooltip(hoverInfo)} */}
    </DeckGL>
    )
};

export default AdminMap;