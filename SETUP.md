1. Setup environment for Android and iOS
	1. Install `sdkman` for `java`
		1. `curl -s "https://get.sdkman.io" | bash` then follow instructions
		1. Install java 8: `sdk install java 8.0.222-zulu`
	1. Install Android SDK `brew cask install android-sdk` or `brew cask android-studio`
		1. Export `ANDROID_HOME`:
			```
			# Android SDK
			export PATH=$PATH:$ANDROID_HOME/emulator
			export ANDROID_HOME=/Users/{user}/Library/Android/sdk
			export PATH=$PATH:$ANDROID_HOME/platform-tools/
			export PATH=$PATH:$ANDROID_HOME/tools/bin/
			export PATH=$PATH:$ANDROID_HOME/tools/
			PATH=$ANDROID_HOME/emulator:$PATH
			```
		1. Setup android sdk repo:
			```
			mkdir ~/.android
			touch ~/.android/repositories.cfg
			sdkmanager --update
			sdkmanager "extras;intel;Hardware_Accelerated_Execution_Manager" "platform-tools" "platforms;android-28" "emulator" "system-images;android-28;google_apis;x86_64"
			```
		1. Install HAXM: `$ANDROID_HOME/extras/intel/Hardware_Accelerated_Execution_Manager/HAXM\ installation`
			1. https://github.com/intel/haxm/wiki/Installation-Instructions-on-macOS#Downloading_Intel_HAXM
		1. Create rnw-starter-native-emulator: `echo "no" | avdmanager --verbose create avd --force --name "rnw-starter-android-pixel" --device "pixel" --package "system-images;android-28;google_apis;x86_64" --tag "google_apis" --abi "x86_64"`
   		1. https://gist.github.com/mrk-han/66ac1a724456cadf1c93f4218c6060ae
	2. Install cocoapods: `brew install cocoapods`
	3. Install qt library for Android emulator: `brew install qt`
	4. Install Xcode
		1. Setup xcode: `sudo xcode-select --switch /Applications/Xcode.app`
			1. https://github.com/facebook/react-native/issues/18408#issuecomment-386696744

---

1. Setup monorepo w/ yarn and lerna
	1. yarn init
	1. Add `workspaces-experimental true` to `.yarnrc`
	1. Add `lerna`: `yarn add -D -E -W lerna`
	1. `yarn lerna init --independent`
	1. Tell `lerna` to use `yarn` as `npmClient` in `lerna.json`: `"npmClient": "yarn"`
	1. Tell `lerna` to use `yarn workspaces` in `lerna.json`: 		`"useWorkspaces": true`

---

1. Setup typescript
	1. `yarn add -D -E -W typescript`
	1. `yarn tsc --init`
	1. Setup `tsconfig.json` with desired settings
	1. Add `tsconfig.json` and `tsconfig.build.json` to each package

---

1. Setup `react` and `react-native`
	1. Add types to project dev deps: `yarn add -D -E -W @types/react @types/react-native`
	1. Add `react`, `react-dom` and `react-native` to project dev: `yarn add -D -E -W react react-dom react-native`
	1. Add `react` and `react-native` to each package: `yarn workspace @jgornick/rnw-starter-hello-world add -E react react-native`
	1. Setup resolution for `react` and `react-native` in project `package.json`:
		```
		"resolutions": {
			"react": "16.9.0",
			"react-native": "0.60.5"
		},
		```

---

1. Setup `babel`
	1. `yarn add -D -E -W @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript metro-react-native-babel-preset`
	1. Create `babel.config.js`

---

1. Setup `jest` and `enzyme`
	1. `yarn add -D -E -W lodash @types/lodash jest ts-jest @types/jest enzyme @types/enzyme enzyme-adapter-react-16 jest-enzyme enzyme-to-json jest-extended jsdom react-dom`
		1. https://airbnb.io/enzyme/docs/guides/react-native.html#default-example-configuration-for-jest-and-jsdom-replacement
	1. Setup `projects` for each `packages` folder
	1. Setup `moduleNameMapper` paths for each `project`: https://kulshekhar.github.io/ts-jest/user/config/#jest-config-with-helper

---

1. Add react-native app
  1. `yarn lerna create app`
  1. Setup tsconfig and tsconfig.build
  1. Update package.json main to point to dist/main
  1. Create component
	1. Add script to build typescript

---

1. Add react-native hello-world
  1. `yarn lerna create hello-world`

---

1. Setup native package
	1. `yarn react-native init RnwStarterNative --template react-native-template-typescript@next --directory packages/native`
	1. Fix paths to node_modules in `settings.gradle` and `build.gradle`
	1. Add root path to `applyNativeModulesSettingsGradle` and `applyNativeModulesAppBuildGradle`
		1. https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#custom-root-monorepos-1
		1. Need to set the root path to the native app so that the react-native config command knows how to load the paths
	1. Update `@react-native-community/cli-platform-android/native_modules.grade` command to run react-native: `def command = "./node_modules/.bin/react-native config"`
	1. Add the default template `debug.keystore` into `app`
		1. https://github.com/facebook/react-native/issues/25629#issuecomment-513245590
	1. Fix paths in `packages/native/ios/Podfile` to `../../../node_modules...`
	1. Remove fishook pod from Podfile
	1. Install pods: `cd packages/native/ios` then `pod install --repo-update`
  1. Fix metro.config to support monorepo
      1. https://github.com/facebook/react-native/issues/21310#issuecomment-507818090
      1. `yarn workspace @jgornick/rnw-starter-native add -D -E get-yarn-workspaces`
			1. `yarn workspace @jgornick/rnw-starter-native add -E @babel/runtime`
  1. Start emulator: `emulator @rnw-starter-android-pixel -no-boot-anim -netdelay none -no-snapshot -wipe-data -skin 1080x1920 &`
  1. Build and install application: `yarn workspace @jgornick/rnw-starter-native react-native run-android --no-packager`
  1. Start metro bundler: `yarn workspace @jgornick/rnw-starter-native run react-native start`

---

1. Setup `haul`
	1.`yarn workspace @jgornick/rnw-starter-native add -E -D @haul-bundler/babel-preset-react-native @haul-bundler/cli @haul-bundler/core @haul-bundler/preset-0.60`
	1. TOOD: Figure out why cli/init won't work in monorepo anymore
	1. Update native babel.config to use `module:@haul-bundler/babel-preset-react-native` preset
	1. Add custom entry point with pollyfills in haul.config.js using resolve-pkg to react-native in root
		1. https://github.com/callstack/haul/blob/master/docs/Configuration.md#customize-webpack-config

---

1. Setup native storybook (8b220d21eb8d712cd94318712ae34629db600b58)
	1. Add storybook boilerplate to native package
		1. https://storybook.js.org/docs/guides/guide-react-native/

---

1. Setup web storybook w/ react-native-web
	1. `yarn lerna create web`
	1. `yarn workspace @jgornick/rnw-starter-web add -E -D babel-loader @babel/core babel-plugin-react-native-web url-loader webpack`
	1. `yarn workspace @jgornick/rnw-starter-web add -E react react-dom react-native-web @storybook/addon-options @storybook/react`
	1.

8. Setup hygen for generators
	3. `yarn add -D -E -W hygen`
	4. `yarn hygen init self`


https://gitlab.com/protium-network/protium/tree/master
https://github.com/erickjth/react-native-web-monorepo-lerna
https://github.com/brunolemos/react-native-web-monorepo
https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter

---

# Setup iOS

## Get list of devices

xcrun simctl list --json devicetypes

Parse the JSON for iPhone X

## Get list of runtimes

xcrun simctl list --json runtimes

Parse the JSON for latest iOS

## Create emulator

xcrun simctl create rnw-starter-iphone-x com.apple.CoreSimulator.SimDeviceType.iPhone-X com.apple.CoreSimulator.SimRuntime.iOS-13-1

Returns the UUID

## Get the rnw-starter-iphone-x UUID

xcrun simctl list --json devices

Parse the JSON for the runtime and name

## Boot the emulator

xcrun simctl boot F5E2DAD2-2844-4191-A1D8-9AFF3EBB81AD

## Start the emulator

open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/

## Update podfile node module locations

Update packages/native/ios/Podfile node_module location to react-native

## Update project.pbxproj with node module locations

Update packages/native/ios/RnwStarterNative.xcodeproj/project.pbxproj node_module location to react-native

## Update *.scscheme with node module locations

Update packages/native/ios/RnwStarterNative.xcodeproj/xcshareddata/xcschemes/RnwStarterNative-tvOS.xcscheme node_module location to react-native
Update packages/native/ios/RnwStarterNative.xcodeproj/xcshareddata/xcschemes/RnwStarterNative.xcscheme node_module location to react-native

> Open your favorite editor and use the Search & Replace feature to replace all occurrences of node_modules/react-native/ with ../../node_modules/react-native/.

## Install pods

cd packages/native/ios && pod install --repo-update && cd -

## Install application to emulator

yarn workspace @jgornick/rnw-starter-native react-native run-ios --simulator "rnw-starter-iphone-x" --no-packager

---

# Errors

* [invalid property name - must be a string, number or identifier](https://github.com/facebook/hermes/blob/master/lib/Parser/JSParserImpl.cpp#L2436)
  * Looks like there is something wrong with hermes enabled and running non-debug mode