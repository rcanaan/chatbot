import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layuot";
import HomePage from "./components/HomePage";
import { MessageProvider } from "./Context/MessageContext";

function App() {
  return (
    <Router>
      <MessageProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </MessageProvider>
    </Router>
  );
}

export default App;
