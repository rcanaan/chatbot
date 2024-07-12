import MessageList from "./MessageList";
import styles from "./HomePage.module.css";
interface HomePageProps {
  username?: string;
}

export default function HomePage({ username }: HomePageProps) {
  return (
    <div className={styles.homePage}>
      <MessageList />
    </div>
  );
}
