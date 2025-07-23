<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Deep Link Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome via Deep Link!</h1>
      <p>You have successfully opened this page using a deep link.</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
</script>