import "./typeNavbar.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TypeNavbar = ({ setSelectedType }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/Type/GetTypes"
      );
      setTypes(data);
    };
    getTypes();
  }, []);

  const changeType = (type) => {
    setSelectedType(type);
    const element = document.getElementById("parts");
    window.scrollTo(element, 1000);
  };

  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  return (
    <div className="select-navbar">
      {types.map((type, i) => {
        return (
          <Link
            className="select-navbar-item"
            key={i}
            onClick={() => changeType(type.name)}
            to={"/"}
          >
            <img src={type.picture} style={{ height: "30px", width: "30px" }} />
            {!smallWidth && <span>{type.name}</span>}
            <div id="hover" />
          </Link>
        );
      })}
    </div>
  );
};

export default TypeNavbar;
