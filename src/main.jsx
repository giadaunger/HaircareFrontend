import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import Layout from "./pages/Layout";
import HaircareRoutineGenerator from "./pages/HaircareRoutineGenerator";
import DisplayResult from "./pages/DisplayResult";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HaircareRoutineGenerator />}></Route>
          <Route path="/result" element={<DisplayResult /> }></Route>
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
