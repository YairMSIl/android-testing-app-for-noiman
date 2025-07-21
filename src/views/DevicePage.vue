<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Device Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Device Info</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <div v-if="deviceInfo">
          <h2>Device Information</h2>
          <p><strong>Model:</strong> {{ deviceInfo.model }}</p>
          <p><strong>Platform:</strong> {{ deviceInfo.platform }}</p>
          <p><strong>Operating System:</strong> {{ deviceInfo.operatingSystem }}</p>
          <p><strong>OS Version:</strong> {{ deviceInfo.osVersion }}</p>
          <p><strong>Manufacturer:</strong> {{ deviceInfo.manufacturer }}</p>
          <p><strong>Is Virtual:</strong> {{ deviceInfo.isVirtual }}</p>
        </div>
        <div v-if="batteryInfo">
          <h2>Battery Information</h2>
          <p><strong>Battery Level:</strong> {{ batteryInfo.batteryLevel }}</p>
          <p><strong>Is Charging:</strong> {{ batteryInfo.isCharging }}</p>
        </div>
        <ion-button @click="showBatteryToast" v-if="batteryInfo">Show Battery Toast</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/**
 * @file-overview This file contains a page component that displays device information.
 * It uses Ionic Vue components for its layout.
 *
 * @example
 * ```html
 * <DevicePage />
 * ```
 */
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { Device, DeviceInfo, BatteryInfo } from '@capacitor/device';
import { Toast } from '@capacitor/toast';

const deviceInfo = ref<DeviceInfo>();
const batteryInfo = ref<BatteryInfo>();

onMounted(async () => {
  deviceInfo.value = await Device.getInfo();
  batteryInfo.value = await Device.getBatteryInfo();
});

const showBatteryToast = async () => {
  if (batteryInfo.value) {
    await Toast.show({
      text: `Current battery level is ${batteryInfo.value.batteryLevel}`,
    });
  }
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>