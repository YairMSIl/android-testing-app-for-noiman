/**
 * @file-overview This file contains a page component that will display motion information.
 * It uses Ionic Vue components for its layout.
 *
 * @example
 * ```html
 * <MotionPage />
 * ```
 */
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Motion</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Motion</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col>
              <h2>Accelerometer</h2>
              <p>x: {{ accelData?.x?.toFixed(4) }}</p>
              <p>y: {{ accelData?.y?.toFixed(4) }}</p>
              <p>z: {{ accelData?.z?.toFixed(4) }}</p>
            </ion-col>
            <ion-col>
              <h2>Orientation</h2>
              <p>Alpha: {{ orientationData?.alpha?.toFixed(4) }}</p>
              <p>Beta: {{ orientationData?.beta?.toFixed(4) }}</p>
              <p>Gamma: {{ orientationData?.gamma?.toFixed(4) }}</p>
            </ion-col>
          </ion-row>
        </ion-grid>

        <div class="scene">
          <div class="cube" ref="cubeEl">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Motion, MotionEventResult, MotionOrientationEventResult } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';

const accelData = ref<MotionEventResult['accelerationIncludingGravity']>();
const orientationData = ref<MotionOrientationEventResult>();
const cubeEl = ref<HTMLElement | null>(null);

let accelListener: PluginListenerHandle | null = null;
let orientationListener: PluginListenerHandle | null = null;

onMounted(async () => {
  try {
    accelListener = await Motion.addListener('accel', event => {
      accelData.value = event.accelerationIncludingGravity;
    });

    orientationListener = await Motion.addListener('orientation', event => {
      orientationData.value = event;
    });
  } catch (e) {
    console.error('Motion detection not available', e);
  }
});

onUnmounted(() => {
  if (accelListener) {
    accelListener.remove();
  }
  if (orientationListener) {
    orientationListener.remove();
  }
});

watch(orientationData, (newData) => {
  if (cubeEl.value && newData) {
    const { alpha, beta, gamma } = newData;
    cubeEl.value.style.transform = `rotateZ(${alpha}deg) rotateX(${beta}deg) rotateY(${gamma}deg)`;
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  padding: 16px;
}

.scene {
  width: 200px;
  height: 200px;
  perspective: 400px;
  margin: 40px auto;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s linear;
}

.face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  background: rgba(var(--ion-color-primary-rgb), 0.5);
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 200px;
}

.front {
  transform: translateZ(100px);
}
.back {
  transform: rotateY(180deg) translateZ(100px);
}
.right {
  transform: rotateY(90deg) translateZ(100px);
}
.left {
  transform: rotateY(-90deg) translateZ(100px);
}
.top {
  transform: rotateX(90deg) translateZ(100px);
}
.bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
</style>