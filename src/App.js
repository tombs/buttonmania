import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import RadioButtons from "./pages/RadioButtons/RadioButtons";
import Unauthorized from "./pages/Unauthorized";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="radio" element={<RadioButtons />} />
          <Route path="*" element={<Unauthorized />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
