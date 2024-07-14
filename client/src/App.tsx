import "./App.css";
import Layout from "./components/Layout";
import { MessageProvider } from "./Context/MessageContext";
import MessageList from "./components/MessageList";

import useSocket from "./hooks/useSocket";

const App = () => {
  useSocket();

  return (
    <MessageProvider>
      <Layout>
        <MessageList />
      </Layout>
    </MessageProvider>
  );
};

export default App;
