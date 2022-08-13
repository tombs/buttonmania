import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import RadioButtons from "./pages/RadioButtons";
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="radio" element={<RadioButtons />} />
          <Route path="*" element={<Unauthorized />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
