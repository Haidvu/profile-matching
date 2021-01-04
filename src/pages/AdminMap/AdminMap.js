import DeckGL from "@deck.gl/react";
import { IconLayer } from "@deck.gl/layers";
import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import { MapView } from "@deck.gl/core";
import locationIconAtlas from "../../assets/location-icon-atlas.png";
import locationIconMapping from "../../assets/location-icon-mapping.json";
import mapStyleJson from "../../assets/MapStyle.json";
import { getConfig } from "../../authConfig";
import axios from "axios";

const MAP_VIEW = new MapView({ repeat: true });

const INITIAL_VIEW_STATE = {
  longitude: -95.5698,
  latitude: 29.7604,
  zoom: 8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0,
};

const TOKEN =
    "pk.eyJ1Ijoicm9oaXRzaGFyZGhhIiwiYSI6ImNrajIxcWVxaTIyZWgycXF0NWwxMG9wMTMifQ.NuOk3LeRP5b5Gvtso3MFrg";

export default function AdminMap({
  iconMapping = locationIconMapping,
  iconAtlas = locationIconAtlas,
  mapStyle = mapStyleJson
}) {
  const [hoverInfo, setHoverInfo] = useState({});

  const hideTooltip = () => {
    setHoverInfo({});
  };
  const expandTooltip = (info) => {
    if (info.picked) {
      setHoverInfo(info);
    } else {
      setHoverInfo({});
    }
  };

  
const [data,setData] = useState([])
  const layerProps = {
    data,
    pickable: true,
    getPosition: (d) => d.coordinates,
    iconAtlas,
    iconMapping,
    onHover: !hoverInfo.objects && setHoverInfo,
  };

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
    // eslint-disable-next-line array-callback-return
    res.data.map((res) => {
        let address = getAddress(res.company_address) + res.company_zip;
        setData(data =>[...data,{
          coordinates: [res.company_longitude,res.company_latitude],
          name: res.company_name,
          description: res.company_description,
          phone: res.company_phone_no,
          website: res.company_website,
          contact_email: res.company_contact_email,
          address: address
        }]);
      });
    })
  .catch(err => {
    console.log(err)
  });       
}, [])
  const layer = new IconLayer({
    ...layerProps,
    id: "icon",
    getIcon: (d) => "marker",
    sizeUnits: "meters",
    sizeScale: 2000,
    sizeMinPixels: 30,
  });
  return (
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={{ dragRotate: false }}
      onViewStateChange={hideTooltip}
      onClick={expandTooltip}
      getTooltip={({ object }) => object && `Name: ${object.name}\n Address: ${object.address}\n Description: ${object.description}\n Email: ${object.contact_email}\n Contact: ${object.phone}\n Website: ${object.website}`}
    >
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        mapboxApiAccessToken={TOKEN}
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
}

