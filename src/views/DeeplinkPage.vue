<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Deep Link Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome to the Deep Link Page!</h1>
      <div v-if="Object.keys(queryParams).length">
        <h2>Received URL Parameters:</h2>
        <ul>
          <li v-for="(value, key) in queryParams" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No URL parameters received.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const queryParams = computed(() => route.query);
</script>