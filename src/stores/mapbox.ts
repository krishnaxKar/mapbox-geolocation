import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
interface BaseLocation{
  longitude:string,latitude:string
}
export const useMapBoxStore = defineStore ('track',()=> {
  // state: () => ({
  const  distance = ref("10")
  const  longitude = ref()
  const  latitude = ref()

  // getters: {
  // const  getDistance = computed(()=>distance.value)
  const  getDistance = computed(() => parseInt(distance.value))
  const  getLongitude= computed (() => parseFloat(longitude.value))
  const  getLatitude= computed (() => parseFloat(latitude.value))

  // actions: {


  return{
    distance,longitude,latitude,
    getDistance, getLongitude,getLatitude,
  }
  //persist:true
});
