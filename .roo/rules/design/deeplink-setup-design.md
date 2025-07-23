# Design Document: Deep Link Setup via Redirect

## 1. Overview

This document outlines the process of setting up a deep link for the Android application using a simple HTML redirect. When a user navigates to `https://yairmsil.github.io/android-testing-app-for-noiman/`, they will be automatically redirected to a specific page within the app. This method utilizes a custom URI scheme to launch the application.

## 2. Requirements

*   Configure the project to handle a custom URI scheme.
*   Update the redirect page on GitHub Pages (`docs/index.html`).
*   Add an intent filter to `AndroidManifest.xml` to handle the custom URI.
*   Create a new page within the app to handle the deep link.
*   The app should open a specific page and be able to receive parameters from the URL.

## 3. Implementation Details

### 3.1. `docs/index.html`

The `docs/index.html` file will use a meta refresh tag to redirect the user to the app's custom URI. The link will be structured to be handled by the application.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url='io.ionic.starter://deeplink/open?path=/android-testing-app-for-noiman'" />
  </head>
  <body>
    <p>Redirecting...</p>
  </body>
</html>
```

### 3.2. `AndroidManifest.xml`

An intent filter will be added to the `MainActivity` in `android/app/src/main/AndroidManifest.xml`. This filter will register the app to handle the `io.ionic.starter://deeplink` custom URI scheme.

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="io.ionic.starter" android:host="deeplink" />
</intent-filter>
```

### 3.3. `src/router/index.ts`

A new route will be added to handle the deeplink. This route will correspond to the path specified in the deep link URI.

```typescript
{
    path: '/android-testing-app-for-noiman',
    component: () => import('@/views/DeeplinkPage.vue'),
},
```

### 3.4. `src/views/DeeplinkPage.vue`

A new page component will be created at `src/views/DeeplinkPage.vue`. This page will be displayed when the deep link is opened and can access any parameters passed in the URL.

### 3.5. Mermaid Diagram

```mermaid
graph TD
    A[User clicks link] --> B[Opens GitHub Pages site];
    B --> C{HTML meta refresh redirects};
    C --> D{Android OS handles custom URI};
    D --> E{App opens to DeeplinkPage};
    E --> F[Finish];