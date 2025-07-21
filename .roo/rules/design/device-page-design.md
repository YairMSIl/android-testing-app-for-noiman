# Design Document: Device Information Page

## 1. Overview

This document outlines the implementation of a new "Device" page in the application. This page displays information about the user's device, including battery status and other hardware details, and provides a toast notification with the current battery level.

## 2. Requirements

*   Create a new page accessible from the side menu.
*   Display device information obtained from `@capacitor/device`.
*   Display battery information, including the current charge level.
*   Include a button that, when clicked, shows a toast notification with the battery level.

## 3. Implementation Details

### 3.1. Dependencies

The following dependencies were installed:
*   `@capacitor/device`: To get device and battery information.
*   `@capacitor/toast`: To show toast notifications.
*   `@ionic/pwa-elements`: Required for the Toast plugin to work on the web.

### 3.2. File Changes

*   **`package.json`**: Updated with the new dependencies.
*   **`src/main.ts`**: Configured to use `@ionic/pwa-elements`.
*   **`src/router/index.ts`**: Added a new route `/device` for the `DevicePage`.
*   **`src/views/DevicePage.vue`**: A new component created to display the device information and handle the toast notification.
*   **`src/App.vue`**: Updated to include a link to the new "Device" page in the side menu.

### 3.3. Component Logic (`DevicePage.vue`)

*   The component uses the `onMounted` lifecycle hook to fetch device and battery information using the `Device.getInfo()` and `Device.getBatteryInfo()` methods.
*   The fetched information is stored in reactive variables and displayed in the template.
*   A button is included that, when clicked, calls a method to display a toast notification with the current battery level using `Toast.show()`.

## 4. Mermaid Diagram

```mermaid
graph TD
    A[Start] --> B{Install Dependencies};
    B --> C{Configure PWA Elements};
    C --> D{Create Device Page Component};
    D --> E{Add New Route};
    E --> F{Update Side Menu};
    F --> G{Implement Device & Toast Logic};
    G --> H[Finish];