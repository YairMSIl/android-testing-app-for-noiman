# Design Document: Deep Link with URL Parameter Handling

## 1. Overview

This document outlines the necessary changes to the existing deep link implementation to support passing URL parameters from the initial link down to the application. This will allow for more dynamic deep linking, enabling the app to display specific content based on the parameters provided in the URL.

## 2. Requirements

*   The deep link redirect mechanism must capture and forward all URL parameters.
*   The application must be able to parse the incoming deep link URL and extract the parameters.
*   The target page within the app (`DeeplinkPage.vue`) must be able to access and display the URL parameters.

## 3. Implementation Details

### 3.1. `docs/index.html`

The `docs/index.html` file will be updated to use a small script that captures the URL parameters from the incoming request and appends them to the custom URI scheme. This will replace the static meta refresh tag.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Redirecting...</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      const params = new URLSearchParams(window.location.search);
      const path = params.get('path') || '/android-testing-app-for-noiman';
      params.delete('path');
      const newUrl = `io.ionic.starter://deeplink/open?path=${path}&${params.toString()}`;
      window.location.href = newUrl;
    </script>
  </head>
  <body>
    <p>Redirecting...</p>
  </body>
</html>
```

### 3.2. `src/App.vue`

The `appUrlOpen` event listener in `src/App.vue` will be modified to handle the full URL, including parameters. The entire URL will be passed to the router, which will then handle the parsing of the path and query parameters.

```typescript
// src/App.vue
import { App } from '@capacitor/app';
import { useRouter } from 'vue-router';

const router = useRouter();
App.addListener('appUrlOpen', (event) => {
  const url = new URL(event.url);
  const path = url.searchParams.get('path');
  if (path) {
    // Reconstruct the path with query parameters, excluding the 'path' parameter itself
    url.searchParams.delete('path');
    const newPath = `${path}?${url.searchParams.toString()}`;
    router.push(newPath);
  }
});
```

### 3.3. `src/views/DeeplinkPage.vue`

The `DeeplinkPage.vue` component will be updated to use the `useRoute` hook from `vue-router` to access the query parameters from the URL. These parameters will then be displayed on the page.

```vue
<!-- src/views/DeeplinkPage.vue -->
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
```

## 4. Mermaid Diagram

```mermaid
graph TD
    A[User clicks link with params] --> B[Opens GitHub Pages site];
    B --> C{Script captures and forwards params};
    C --> D{Android OS handles custom URI with params};
    D --> E{App opens};
    E --> F{App handles URL, extracts params, and navigates};
    F --> G[Displays DeeplinkPage with params];
    G --> H[Finish];