<script setup lang="ts">
import {onMounted,ref} from "vue"
  import { useMapBoxStore } from "../stores/mapbox"
  const useMapBox = useMapBoxStore()

onMounted(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
        useMapBox.longitude = position.coords.longitude.toString()
        useMapBox.latitude = position.coords.latitude.toString()
    },
    error => console.log(error),
    {
        enableHighAccuracy:true
    })
})


</script>
<template>
    <q-page class="q-pa-lg">
        <div>
            <h3 class="text-center bg-red text-green q-ma-lg">Track APP Demo (Test)</h3>
        </div>
        <div>
            <q-input v-model="useMapBox.distance" type="number" label="Distance" />
            <q-input v-model="useMapBox.longitude"  type="number" label="Longitude" />
            <q-input v-model="useMapBox.latitude"  type="number" label="Latitude" />
            <q-btn outline color="primary" label="Track" :to="{name:'mapboxtrack'}" />
        </div>
    </q-page>
  </template>