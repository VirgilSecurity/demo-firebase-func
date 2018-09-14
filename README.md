# Demo Firebase Functions
This repo deploys the Firebase functions necessary to run the [iOS](https://github.com/VirgilSecurity/demo-firebase-js), [Android](https://github.com/VirgilSecurity/demo-firebase-android) and [JavaScript](https://github.com/VirgilSecurity/demo-firebase-js) end-to-end encrypted, HIPAA-compliant Firebase chat apps.

* Clone the repository from our GitHub.
```
git clone https://github.com/VirgilSecurity/demo-firebase-func.git
```
* Go to the project root:
```
cd demo-firebase-func
```
* Install [Node](https://nodejs.org/en/download) if you don't have one. Firebase recommends v6.14.0, but we tested the project on 8.x and it works.
* Run `firebase login` to login to your firebase account. Open your terminal app and run `npm install -g firebase-tools` if you don't have it.
* After installed, run `firebase init` in the project root.
* Select `Functions: Configure and deploy Cloud Functions` with the SPACEBAR, then hit ENTER
* Select your firebase project from the list, ENTER.
* Select the following answers:
```
? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? Yes
? File functions/package.json already exists. Overwrite? No
? File functions/tslint.json already exists. Overwrite? No
? File functions/tsconfig.json already exists. Overwrite? No
? File functions/src/index.ts already exists. Overwrite? No
? Do you want to install dependencies with npm now? Yes
```
* If you haven't already signed up for a Virgil Security account, [sign up now](https://virgilsecurity.com/getstarted). Follow the steps to create an app, choose END-TO-END ENCRYPTION -> FIREBASE and click on the [Download config] link to get your `config.json` file.
* Copy `config.json` to the project's root folder and run:
```
cd functions
npm install
npm run configure
```
* (Windows users only) In `firebase.json` rename `$RESOURCE_DIR` to `%RESOURCE_DIR%`
* Run `firebase deploy --only functions`.
*Note: While Cloud Functions are in Beta, this command may fail with an unexpected error (HTTP 503 "The service is currently unavailable" in the log file), in which case, simply try running it again.*

* Go to the Firebase console -> Functions tab and take a note of your brand new function's url `https://YOUR_FUNCTION_URL.cloudfunctions.net/api` from the Event column. You'll need this when setting up your apps.
