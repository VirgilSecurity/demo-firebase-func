# End-to-End Encrypted Firebase Chat App backend setup
This repo deploys the Firebase functions and backend settings necessary to run the [iOS](https://github.com/VirgilSecurity/demo-firebase-js), [Android](https://github.com/VirgilSecurity/demo-firebase-android) and [JavaScript](https://github.com/VirgilSecurity/demo-firebase-js) end-to-end encrypted, HIPAA-compliant Firebase chat apps.

### Create Firebase project
Go to the [Firebase console](https://console.firebase.google.com) and create a new project. If you already have one that you want to use, open it and go to the next step.

## Set up Firebase password auth for the project
* Select the **Authentication** panel and then click the **Sign In Method** tab.
*  Click **Email/Password** and turn on the **Enable** switch, then click **Save**.
* Select the **Database** panel, click **Create database** under Firestore, choose **Start in test mode** and click **Enable**.
* Once the database is created, click on the **Rules** tab, click **Edit rules** and paste:
  ```
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth.uid != null;
      }
    }
  }
  ```
* Click **PUBLISH**.

## Set up the Firebase function
This Firebase function will give out JWT tokens to all your Firebase-authenticated users

* Clone the repository from our GitHub.
```bash
git clone https://github.com/VirgilSecurity/demo-firebase-func.git
cd demo-firebase-func
```
* Install [Node](https://nodejs.org/en/download) if you don't have one. Firebase recommends v6.14.0, but we tested the project on 8.x and it works.
* Login with the Firebase cli:
```bash
firebase login
```
> run `npm install -g firebase-tools` if you don't have it.
* After a successful Firebase login, run:
```bash
firebase init
```
* Select:
```bash
Functions: Configure and deploy Cloud Functions
```
Use the SPACEBAR to select the option, then hit ENTER to proceed.

* Select your firebase project from the list, ENTER.

* Select the following answers:
```bash
? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? Yes
? File functions/package.json already exists. Overwrite? No
? File functions/tslint.json already exists. Overwrite? No
? File functions/tsconfig.json already exists. Overwrite? No
? File functions/src/index.ts already exists. Overwrite? No
? Do you want to install dependencies with npm now? Yes
```
* Log in to your Virgil account. If you don't have one, [sign up for a free account](https://virgilsecurity.com/getstarted). 
* Follow the steps to CREATE AN APPLICATION, choose END-TO-END ENCRYPTION -> CREATE APPLICATION -> BUILD SECURE, HIPAA-COMPLIANT FIREBASE CHAT
* Click the DOWNLOAD CONFIG FILE FOR SAMPLES button to download your `config.json` file
* Copy `config.json` to the project's root folder and run:
```bash
cd functions
npm install
npm run configure
```
* (Windows users only) In `firebase.json` rename `$RESOURCE_DIR` to `%RESOURCE_DIR%`
* Run:
```bash
firebase deploy --only functions
```

**Copy function URL to the clipboard**: go back to the Firebase console -> Functions tab and take a note of your brand new function's url `https://YOUR_FUNCTION_URL.cloudfunctions.net/api` from the Event column. **You'll need this when setting up your mobile or web apps**.
