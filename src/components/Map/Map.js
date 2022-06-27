import React, {useState, useCallback, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
}

const center = {
  lat: 40.712776,
  lng: -74.005974
}

const options = {
  mapId: "83b90d4e6415406c"
}

function Map(props) {
  // console.log(props);
  const isLoaded = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAwcOSQ6hnqoqiXX_1D1ykHOBAZZ2UorHE"
  })

  const coordinatesList = props.postList.map((post) => {
    // console.log(post.coordinates);
    return (
      <MarkerF
      position= {{lat: post.coordinates.lat, lng: post.coordinates.lng}} 
      icon={{
        url:"https://i.ibb.co/4JFPCZP/location-dot-solid.png",
        scaledSize: new window.google.maps.Size(15,20)
      }}
      />
    )
  })

  return isLoaded ? (
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={options}
      >

      await {coordinatesList} 

      </GoogleMap>
  ) : <h1>Loading</h1>
}
export default React.memo(Map)
