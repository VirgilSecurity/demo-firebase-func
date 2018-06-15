# Demo Firebase Functions
* Clone the repository from our GitHub.
```
git clone https://github.com/VirgilSecurity/demo-firebase-func.git
```
* Go to the project root:
```
cd demo-firebase-func
```
* Install node if you don't have one. Firebase recommend to use v6.14.0 at the moment of the demo creation.
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
* If you have `config.json` file, put it in the project root and run:
```
cd functions && npm run configure
```
and if you haven't follow 4 extra steps:
> 1. We'll now run this Firebase cli command, but first replace the parameters with data from you Virgil dashboard:
```
firebase functions:config:set virgil.apiprivatekey="YOUR_API_PRIVATE_KEY" virgil.appid="YOUR_APP_ID" virgil.apikeyid="YOUR_API_KEY_ID"
```
> 2. Log back to the [Virgil Dashboard](https://dashboard.virgilsecurity.com/),
> 3. Create an API key: the private key will be copied on your clipboard. Paste this API key and your API Key's ID into the cli command
> 4. Go back to the dashboard, create an application and paste the Application ID into the cli command. Run it.
* (Windows users only) In firebase.json rename `$RESOURCE_DIR` to `%RESOURCE_DIR%`
* Run `firebase deploy --only functions`.
*Note: While Cloud Functions are in Beta, this command may fail with an unexpected error (HTTP 503 "The service is currently unavailable" in the log file), in which case, simply try running it again.*

* Go to the Firebase console -> Functions tab and copy your function url from the Event column
* Go to Xcode -> Firebase Chat iOS/Helpers/Virgil/VirgilHelper.swift and change variable jwtEndpoint to:
```
https://YOUR_FUNCTION_URL.cloudfunctions.net/api/generate_jwt