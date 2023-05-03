<script setup lang="ts">
import {onMounted,onUnmounted,ref} from "vue"
  import { useMapBoxStore } from "../stores/mapbox"
  const useMapBox = useMapBoxStore()

  let watchID: number;
  let geoLoc: Geolocation;
         
function showLocation(position: { coords: { latitude: number; longitude: number; }; }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    useMapBox.longitude = longitude.toString()
    useMapBox.latitude = latitude.toString()
}

function errorHandler(err: { code: number; }) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getLocationUpdate(){
    if(navigator.geolocation){
        geoLoc = navigator.geolocation;
        watchID = geoLoc.watchPosition(showLocation, errorHandler, {enableHighAccuracy:true});
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}

function stopWatch() {
    geoLoc.clearWatch(watchID);
}

onMounted(()=>{
    getLocationUpdate()    
})
onUnmounted(()=>{
    stopWatch()
})


</script>
<template>
    <q-page class="q-pa-lg">
        <div>
            <h3 class="bg-red text-green q-my-lg flex items-center justify-center" style="height: 80px;">Track APP (TestDemo)</h3>
        </div>
        <div>
            <q-input v-model="useMapBox.distance" type="number" label="Distance" />
            <q-input v-model="useMapBox.longitude" type="number" label="Longitude" />
            <q-input v-model="useMapBox.latitude" type="number" label="Latitude" />
            <q-btn outline color="primary" class="full-width" label="Track" :to="{name:'mapboxtrack'}" />
        </div>
    </q-page>
  </template>
<style scoped>
.q-input{
    margin-bottom: 15px;
}
</style>