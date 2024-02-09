"use client";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "@/utils/firebase/firebase.utils";
import React, { useState } from "react";

export default function Signin() {
  const [googleUser, setGoogleUser] = useState({ name: "", email: "" });

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    // Save it in firestore
    const userDocRef = await createUserDocumentFromAuth(response.user);
    // save it in mobgodb
    const { displayName, email } = response.user;
    if (displayName && email) {
      setGoogleUser({
        name: displayName,
        email,
      });
    }
  };

  return (
    <>
      <h1>Signin</h1>
      <button onClick={logGoogleUser}>Sign In With Goolge</button>
      {googleUser.name && googleUser.email && (
        <div>
          <p>
            Signed in user info: {googleUser.name} | {googleUser.email}
          </p>
        </div>
      )}
    </>
  );
}
