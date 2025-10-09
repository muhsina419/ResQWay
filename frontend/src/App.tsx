import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
