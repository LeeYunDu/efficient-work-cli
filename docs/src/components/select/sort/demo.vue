<template>
  <itemSort :sort-item="sortItem" @handleSearch="handleSearch" />
 </template>
 
 <script lang="ts" setup>
 import itemSort from './sort.vue'
 let sortItem = [
   { label:'发布时间',key:'publishTime' }
 ]
 function handleSearch (params){
  console.log(params,'params');
  
  //  curParams.value.sort = params.sort
 }
 </script>