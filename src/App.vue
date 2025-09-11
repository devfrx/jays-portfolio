<template>
  <ion-app>
    <ion-content>
      <Navbar />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-content>
  </ion-app>
</template>

<script setup lang="ts">
  import {
    IonApp,
    IonContent,
    IonRouterOutlet,
  } from '@ionic/vue';

  import Navbar from './components/navbar.vue';
</script>

<style scoped></style>
