import Image from "next/image";
import styles from "./page.module.css";
import Event from "@/components/Event.component";
import Signin from "@/screens/Signin";

import { createEvent, createUser } from "@/actions/events.actions";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Signin /> */}
      <Event createEvent={createEvent} createUser={createUser} />
    </main>
  );
}
