import admin from "firebase-admin";

// Ensure the private key is properly formatted with newlines
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const config = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: privateKey,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
};

// Initialize Firebase Admin if it hasn't been initialized already
const firebaseAdmin = admin.apps.length > 0 ? admin.app() : admin.initializeApp(config);

export { firebaseAdmin };