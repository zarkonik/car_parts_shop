import { Link } from "react-router-dom";
import "./selectNavbar.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import useMediaQuery from "@mui/material/useMediaQuery";

const SelectNavbar = () => {
  const dateEntries = [
    {
      name: "Svi delovi",
      tag: "category",
    },
    {
      name: "Akumulatori",
      tag: "group",
    },
    {
      name: "Gume",
      tag: "group",
    },
    {
      name: "Ulja i tecnosti",
      tag: "subcategory",
    },
    {
      name: "Univerzalni delovi",
      tag: "category",
    },
    {
      name: "Alati i oprema",
      tag: "category",
    },
  ];

  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  const makeUrl = (item) => {
    if (item.tag === "group") {
      return `/products-name/${item.name}`;
    } else if (item.tag === "subcategory") {
      return `/choose-subcategory-name/${item.name}`;
    } else if (item.name === "Svi delovi") {
      return `/choose-category-name/${item.name}/all`;
    } else return `/choose-category-name/${item.name}`;
  };

  return (
    <div className="select-navbar">
      {dateEntries.map((de, i) => {
        return (
          <Link className="select-navbar-item" key={i} to={makeUrl(de)}>
            <LocalShippingIcon style={{ color: "#87C3E5", fontSize: "24px" }} />
            {!smallWidth && <span>{de.name}</span>}
            <div id="hover" />
          </Link>
        );
      })}
    </div>
  );
};

export default SelectNavbar;
