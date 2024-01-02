import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import TypeNavbar from "./components/typeNavbar/TypeNavbar";
import { useRef, useState } from "react";

function App() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <TypeNavbar setSelectedType={setSelectedType} />
      {/*<HelpHero />*/}
      <Outlet context={[selectedType, setSelectedType]} />
      <Footer />
    </div>
  );
}

export default App;
