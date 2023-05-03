import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
interface BaseLocation{
  longitude:string,latitude:string
}
export const useMapBoxStore = defineStore ('track',()=> {
  // state: () => ({
  const  distance = ref("10")
  const  longitude = ref("-7.09262")
  const  latitude = ref("31.791702")
  const  isInside=ref(true)

  // getters: {
  // const  getDistance = computed(()=>distance.value)
  const  getDistance = computed(() => parseInt(distance.value))
  const  getLongitude= computed (() => parseFloat(longitude.value))
  const  getLatitude= computed (() => parseFloat(latitude.value))
  const  getIsInside= computed (() => isInside.value)

  // actions: {


  return{
    distance,longitude,latitude,isInside,
    getDistance, getLongitude,getLatitude,getIsInside
  }
  //persist:true
});
