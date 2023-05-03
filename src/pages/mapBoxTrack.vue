<template>
    <q-page style="width: 100%">
        <div id='mapping' style='width: 100%; height: 100vh;'></div>
    </q-page>
  </template>
   
  <script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
  import {point,polygon,booleanPointInPolygon, circle } from '@turf/turf';
  import { useQuasar } from 'quasar'
  import { useMapBoxStore } from "../stores/mapbox"
  const $q = useQuasar()
  const useMapBox = useMapBoxStore()
    let userLocation:any
  const coordinates = ref({longitude :0, latitude:0})
  onMounted(()=>{
  
    userLocation = navigator.geolocation.watchPosition(data=>{
          console.log(data)
          // coordinates.value.push({longitude:data.coords.longitude, latitude:data.coords.latitude})
          coordinates.value = {longitude:data.coords.longitude, latitude:data.coords.latitude}
      },
      error => console.log(error),
      {
          enableHighAccuracy:true
      })


      mapboxgl.accessToken = 'pk.eyJ1Ijoic2lsZXNheDIiLCJhIjoiY2xoM24wbzF2MXA5YjNpcXY5b2p2MmVseCJ9.J-UUUve8dPVjeGGFBnaASQ';
   
      const map = new mapboxgl.Map({
      container: 'mapping',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center:[ coordinates.value.longitude,coordinates.value.latitude], // starting position [lng, lat]
          zoom: 15, // starting zoom
      });
  
  
  
  
  // map.on('click', (e) => {
  //   // Get the marker's coordinates
  //   const { lng, lat } = e.lngLat;
  //   baseLocation.latitude=lat;
  //   baseLocation.longitude=lng
  // });
  
  //create Polygon fence
  // const geoFence = {
  //   "type": "FeatureCollection",
  //   "features": [{
  //       "type": "Feature",
  //       "geometry": {
  //           "type": "Polygon",
  //           "coordinates": [
  //               [
  //                 [-6.800532119411523,34.033634881408],
  //                 [-6.79925002356253, 34.033688227898594],
  //                 [-6.799437778184768,34.03302583992943],
  //                 [-6.800727920660428,34.03290803213146],
  //                 [-6.800532119411523,34.033634881408],
  //               ]
  //           ]
  //       }
  //   }]
  // };
  
  // Add the circle to your Mapbox map as a new data source and layer
  
  
    
  let geojsonFence = circle([useMapBox.getLongitude,useMapBox.getLatitude], useMapBox.getDistance, {steps: 64, units: 'meters'})
  map.on('load', function() {
  
  map.addSource('geofence', {
        'type': 'geojson',
        'data': geojsonFence
    });
    map.on("click",(e:any)=>{
      const { lng, lat } = e.lngLat;
      useMapBox.longitude = lng
      useMapBox.latitude =lat

      geojsonFence = circle([useMapBox.getLongitude,useMapBox.getLatitude], useMapBox.getDistance, {steps: 64, units: 'meters'})
      map.getSource('geofence').setData( geojsonFence);
      })
    map.addLayer({
        'id': 'geofence',
        'type': 'fill',
        'source': 'geofence',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.5
        }
    });
  });
  
  map.on('load', async () => {
  // Get the initial location of the International Space Station (ISS).
  const geojson = await getLocation();
  // Add the ISS location as a source.
  map.addSource('iss', {
  type: 'geojson',
  data: geojson
  });
  // Add the rocket symbol layer to the map.
  map.addLayer({
  'id': 'iss',
  'type': 'symbol',
  'source': 'iss',
  'layout': {
  'icon-image': 'rocket'
  }
  });
  
  // Update the source from the API every 2 seconds.
  const updateSource = setInterval(async () => {
  const geojson = await getLocation(updateSource);
  map.getSource('iss').setData(geojson);
  }, 8000);
  
  async function getLocation(updateSource?:any) {
  // Make a GET request to the API and return the location of the ISS.
  try {
  
  const { latitude, longitude } = coordinates.value
  //console.log(`latitude : ${latitude}, longitude: ${longitude}`);
  // Fly the map to the location.
  map.flyTo({
      center: [longitude, latitude],
  });
  
  //   polygon(geoFence.features[0].geometry.coordinates)
  
    const isInside = ref(booleanPointInPolygon(
    point([longitude,latitude]),
    //polygon
    geojsonFence  ));
       // Trigger a notification if the user is outside the geofence
       if (!isInside.value) {
  
          $q.notify({
            type: 'negative',
            message: `Alert, You're out of the safe zone!\nLongitude: + ${longitude}, latitude : ${latitude}`,
            actions: [
              { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
            ]
          })
    }
    // else{
    //   console.log('isInside Longitude: ' + longitude);
    //   console.log('isInside Latitude: ' + latitude);
    // }
  
  
  
  
  // Return the location of the ISS as GeoJSON.
  return {
  'type': 'FeatureCollection',
  'features': [
      {
          'type': 'Feature',
          'geometry': {
              'type': 'Point',
              'coordinates': [longitude, latitude]
          }
      }
  ]
  };
  } catch (err) {
  // If the updateSource interval is defined, clear the interval to stop updating the source.
      if (updateSource) clearInterval(updateSource);
          console.log(err);
      }
  }
  });
  })
  onUnmounted(()=>{
    window.navigator.geolocation.clearWatch(userLocation)
  })
  </script>
  
  <style scoped>
  body{
    padding: 0;
    margin: 0;
    top: 0;
    right: 0;
  }
  </style>
  