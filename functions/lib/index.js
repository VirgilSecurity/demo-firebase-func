"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const virgil_sdk_1 = require("virgil-sdk");
const virgil_crypto_1 = require("virgil-crypto");
const app = express();
admin.initializeApp();
const validateFirebaseIdToken = (req, res, next) => {
    console.log("Check if request is authorized with Firebase ID token");
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.", "Make sure you authorize your request by providing the following HTTP header:", "Authorization: Bearer <Firebase ID Token>");
        res.status(403).send("Unauthorized");
        return;
    }
    const idToken = req.headers.authorization.split("Bearer ")[1];
    console.log("id token", idToken);
    admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {
        console.log("ID Token correctly decoded", decodedIdToken);
        req.user = decodedIdToken;
        next();
    })
        .catch(error => {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(401).send("Unauthorized");
    });
};
const crypto = new virgil_crypto_1.VirgilCrypto();
const { appid, apikeyid, apiprivatekey } = functions.config().virgil;
const generator = new virgil_sdk_1.JwtGenerator({
    appId: appid,
    apiKeyId: apikeyid,
    apiKey: crypto.importPrivateKey(apiprivatekey),
    accessTokenSigner: new virgil_crypto_1.VirgilAccessTokenSigner(crypto)
});
app.use(cors({ origin: true, methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(validateFirebaseIdToken);
app.get("/virgil-jwt", (req, res) => {
    const identity = req.user.uid;
    const virgilJwtToken = generator.generateToken(identity);
    res.json({ token: virgilJwtToken.toString() });
});
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(app);
exports.createUser = functions.firestore
    .document("Channels/{channelId}/Messages/{messageId}")
    .onCreate((snap, context) => {
    console.log(snap.data(), context);
    const message = snap.data();
    const receiver = message.receiver;
    console.log("receiver", receiver);
    return admin
        .firestore()
        .collection("Users")
        .doc(receiver)
        .get()
        .then(doc => {
        console.log("message", message);
        const user = doc.data();
        const notification = {
            data: { uid: user.uid },
            notification: {
                title: "new message",
                body: message.body
            },
            apns: {
                payload: {
                    aps: {
                        "mutable-content": 1
                    }
                }
            },
            token: user.registration_token
        };
        console.log(notification);
        // Send a message to the device corresponding to the provided
        // registration token.
        admin
            .messaging()
            .send(notification)
            .then(response => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
        })
            .catch(error => {
            console.log("Error sending message:", error);
        });
    });
});
//# sourceMappingURL=index.js.map