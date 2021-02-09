import DeckGL from "@deck.gl/react";
import { IconLayer } from "@deck.gl/layers";
import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import { MapView } from "@deck.gl/core";
import locationIconAtlas from "../../assets/location-icon-atlas.png";
import locationIconMapping from "../../assets/location-icon-mapping.json";
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

function getTooltip({ object }) {
  return (
    object && {
      html: `\
      <div style="width:250px">
      <div><b>Company Information</b></div>
      <div>Name: ${object.name}</div>
      <div>Address: ${object.address}</div>
      <div>Description: ${object.description}</div>
      <div>Email: ${object.contact_email}</div>
      <div>Website: ${object.website}</div>
      <div>
      `,
    }
  );
}

export default function AdminMap({
  iconMapping = locationIconMapping,
  iconAtlas = locationIconAtlas,
}) {
  const mapStyle =
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

  const [data, setData] = useState([]);
  const layerProps = {
    data,
    pickable: true,
    getPosition: (d) => d.coordinates,
    iconAtlas,
    iconMapping,
  };

  const getAddress = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return `${res[0]}, ${res[1]}, ${res[2]} `;
    }
    return "";
  };

  useEffect(() => {
    axios
      .get("/company_profile/", getConfig())
      .then((res) => {
        res.data.map((res) => {
          let address = getAddress(res.company_address) + res.company_zip;
          setData((data) => [
            ...data,
            {
              coordinates: [
                parseFloat(res.company_longitude),
                parseFloat(res.company_latitude),
              ],
              name: res.company_name,
              description: res.company_description,
              website: res.company_website,
              contact_email: res.company_contact_email,
              address: address,
            },
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const layer = new IconLayer({
    ...layerProps,
    id: "icon-layer",
    getIcon: (d) => "marker",
    sizeUnits: "meters",
    sizeScale: 2000,
    sizeMinPixels: 30,
    pickable: true,
    getPosition: d => d.coordinates,
    getSize: d => 5
  });
  return (
    <DeckGL
      width={"100%"}
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
      useDevicePixels={false}
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
