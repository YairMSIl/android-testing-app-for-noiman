To run on android, use this command:
`ionic cap run android --target 4A071JEKB03246`

## Building and Deploying
Run your app in the browser with:

```bash
ionic serve
```

### For native platforms:

Build web assets: `ionic build`
Add platforms: `ionic cap add ios`, `ionic cap add android`
Copy assets: `ionic cap copy`
Open in IDE: `ionic cap open ios` or `ionic cap open android`
Configure permissions in `Info.plis`t (iOS) or `AndroidManifest.xml` (Android), then build and run from Xcode or Android Studio.

