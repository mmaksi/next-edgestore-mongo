"use client";

import { useState } from "react";

import styles from "./Event.module.css";
import ImageUploader from "./ImageUploader";
import Image from "next/image";

interface Props {
  createEvent: (imgSrc: string) => Promise<void>;
  createUser: () => Promise<void>;
}

export default function Event({ createEvent, createUser }: Props) {
  const [file, setFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState("");

  return (
    <div className={styles.upload__container}>
      {imageSrc.length > 0 && (
        <Image alt="event image url" src={imageSrc} width={500} height={500} />
      )}

      <input
        type="file"
        name="event"
        id="event"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      {file !== undefined && (
        <ImageUploader
          type="upload"
          file={file}
          setImageSrc={setImageSrc}
          createEvent={createEvent}
          createUser={createUser}
        />
      )}
    </div>
  );
}
