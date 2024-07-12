import "./App.css";
import Layout from "./components/Layuot";
import { MessageProvider } from "./Context/MessageContext";
import MessageList from "./components/MessageList";

function App() {
  return (
    <MessageProvider>
      <Layout>
        <MessageList />
      </Layout>
    </MessageProvider>
  );
}

export default App;
