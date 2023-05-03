<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar >
        <q-toolbar-title>
          <div class="text-center ">MrHaM App</div>
        </q-toolbar-title>
        <q-btn color="white" icon="my_location" flat label="Select safZone" :to="{path:'/'}" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view  />
    </q-page-container>
  </q-layout>
</template>
<style scoped>

  @media only screen and (max-width: 600px) {
  .q-btn{
    font-size: 10px;
  } 
}

</style>
