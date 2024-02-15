import styles from "./page.module.css";
import { BasicButton } from "@/components/common/Button/BasicButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <BasicButton text="押してね" />
    </main>
  );
}
