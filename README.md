# Firebase backend setup for end-to-end encrypted HIPAA-compliant chat apps
Client apps: [iOS](https://github.com/VirgilSecurity/demo-firebase-ios)  [Android](https://github.com/VirgilSecurity/demo-firebase-android)  [JavaScript](https://github.com/VirgilSecurity/demo-firebase-js)

[HIPAA whitepaper](https://virgilsecurity.com/wp-content/uploads/2018/07/Firebase-HIPAA-Chat-Whitepaper-Virgil-Security.pdf).

## Pre-requisites
* Latest [Node](https://nodejs.org/en/download)

## Create Firebase project
* Open the [Firebase console](https://console.firebase.google.com) and create a new project.

> Or use one that you already have.

## Set up Firebase password auth for the project
* Select the **Authentication** panel and then click the **Sign In Method** tab.
* Click **Email/Password** and turn on the **Enable** switch, then click **Save**.
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

* **Clone the repo**
  ```bash
  git clone https://github.com/VirgilSecurity/demo-firebase-func.git
  cd demo-firebase-func
  ```
* **Start up the Firebase cli**
  ```bash
  firebase login
  firebase init
  ```
> run `npm install -g firebase-tools` if you don't have it.

* **Select**:
  ```bash
  Functions: Configure and deploy Cloud Functions
  ```
  > Use the SPACEBAR to select the option, then hit ENTER to proceed.

* **Select your firebase project** from the list, ENTER.

* **Select the following answers**:
  ```bash
  ? What language would you like to use to write Cloud Functions? TypeScript
  ? Do you want to use TSLint to catch probable bugs and enforce style? Yes
  ? File functions/package.json already exists. Overwrite? No
  ? File functions/tslint.json already exists. Overwrite? No
  ? File functions/tsconfig.json already exists. Overwrite? No
  ? File functions/src/index.ts already exists. Overwrite? No
  ? Do you want to install dependencies with npm now? Yes
  ```

* **[Sign up for a free Virgil account](https://virgilsecurity.com/getstarted)** 

* **Get your Virgil application config file**:

  * CREATE AN APPLICATION -> END-TO-END ENCRYPTION -> CREATE APPLICATION -> BUILD SECURE, HIPAA-COMPLIANT FIREBASE CHAT
  * Click the DOWNLOAD CONFIG FILE FOR SAMPLES button to download your `config.json` file
  
* **Copy `config.json` to the project's root folder and run**:
  ```bash
  cd functions
  npm install
  npm run configure
  ```
* (Windows users only) In `firebase.json` rename `$RESOURCE_DIR` to `%RESOURCE_DIR%`
* **Deploy the function**:
  ```bash
  firebase deploy --only functions
  ```

**Copy function URL to the clipboard**: go back to the Firebase console -> Functions tab and take a note of your brand new function's url `https://YOUR_FUNCTION_URL.cloudfunctions.net/api` from the Event column. **You'll need this when setting up your mobile or web apps**.
