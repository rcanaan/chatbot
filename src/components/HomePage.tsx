import MessageList from "./MessageList";
import styles from "./HomePage.module.css";

export default function HomePage() {
  // remove home page only messagelist at App
  return (
    <div className={styles.homePage}>
      <MessageList />
    </div>
  );
}
