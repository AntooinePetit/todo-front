import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ToDoPage from "./pages/ToDoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDoPage />} />
      </Routes>
    </Router>
  );
}
