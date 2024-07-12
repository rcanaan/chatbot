import "./App.css";
import Layout from "./components/Layuot";
import HomePage from "./components/HomePage";
import { MessageProvider } from "./Context/MessageContext";

function App() {
  return (
    <MessageProvider>
      <Layout>
        <HomePage />
      </Layout>
    </MessageProvider>
  );
}

export default App;
