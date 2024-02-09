import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBCPurcQvUPdRGw5G44wOwNpPd6qWcdX4",
  authDomain: "prezently-007.firebaseapp.com",
  projectId: "prezently-007",
  storageBucket: "prezently-007.appspot.com",
  messagingSenderId: "755859995224",
  appId: "1:755859995224:web:6f9009024f72c87784e82d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (authenticatedUser: User) => {
  // Get a reference to a user document in firestore
  const userDocRef = doc(db, "users", authenticatedUser.uid);
  // Get the user document data
  const userSnapshot = await getDoc(userDocRef);

  // Save a user in firestore if they don't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = authenticatedUser;
    const createdAt = new Date();
    try {
      // Store data in the data reference
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userDocRef;
};
