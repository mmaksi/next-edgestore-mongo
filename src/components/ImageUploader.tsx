"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { Dispatch, SetStateAction, useState } from "react";
interface Props {
  type: "upload" | "button";
  file?: File;
  setImageSrc: Dispatch<SetStateAction<string>>;
  createEvent: (imgSrc: string) => Promise<void>;
  createUser: () => Promise<void>;
}

import styles from "./ImageUploader.module.css";

export default function ImageUploader(props: Props) {
  const { file, type, setImageSrc, createUser, createEvent } = props;
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);

  const saveImage = async (file: File | undefined) => {
    try {
      if (file) {
        const response = await edgestore.myPublicImages.upload({
          file,
          onProgressChange: (progress) => setProgress(progress),
        });
        setImageSrc(response.url); // File server
        await createUser(); // create user
        await createEvent(response.url); // create event
      } else {
        throw new Error("No file was selected");
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleClick = async () => {
    await saveImage(file);
  };

  return (
    <>
      <div className={styles.progressbar}>
        <div
          className={styles.progressbar_inner}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button onClick={handleClick}>Upload</button>
    </>
  );
}
